import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Mission, UserMission, User, Streak } from "@/types";

const MISSIONS_PATH = path.join(process.cwd(), "data", "missions.json");
const USER_MISSIONS_PATH = path.join(process.cwd(), "data", "userMissions.json");
const USERS_PATH = path.join(process.cwd(), "data", "users.json");
const STREAKS_PATH = path.join(process.cwd(), "data", "streaks.json");

function getTodayStr() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}
function getCurrentWeekStr() {
  const d = new Date();
  const year = d.getFullYear();
  const firstDay = new Date(year, 0, 1);
  const days = Math.floor((d.getTime() - firstDay.getTime()) / 86400000);
  const week = Math.ceil((days + firstDay.getDay() + 1) / 7);
  return `${year}-W${week}`;
}
function shuffle<T>(arr: T[]): T[] {
  return arr.map(a => [Math.random(), a] as [number, T]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  const userId = url.searchParams.get("userId");
  const missions: Mission[] = JSON.parse(await fs.readFile(MISSIONS_PATH, "utf-8"));
  if (!userId) return NextResponse.json(missions);
  const userMissionsData: UserMission[] = JSON.parse(await fs.readFile(USER_MISSIONS_PATH, "utf-8"));
  const userMissions = [...userMissionsData]; // Copia mutable para modificaciones
  const today = getTodayStr();
  const week = getCurrentWeekStr();
  // Filtrar misiones asignadas para hoy/semana
  const assignedDaily = userMissions.filter((um: UserMission) => String(um.userId) === String(userId) && missions.find((m: Mission) => m.id === um.missionId && m.type === "diaria") && um.assignedAt?.slice(0,10) === today);
  const assignedWeekly = userMissions.filter((um: UserMission) => String(um.userId) === String(userId) && missions.find((m: Mission) => m.id === um.missionId && m.type === "semanal") && um.assignedAt?.startsWith(week));
  // Asignar si faltan
  let changed = false;
  if (assignedDaily.length < 2) {
    const available = shuffle(missions.filter((m: Mission) => m.type === "diaria" && !assignedDaily.some((um: UserMission) => um.missionId === m.id)));
    for (let i = 0; i < 2 - assignedDaily.length && i < available.length; i++) {
      const m = available[i];
      const um: UserMission = { userId: Number(userId), missionId: m.id, progress: 0, completed: false, assignedAt: today, completedAt: null };
      userMissions.push(um);
      assignedDaily.push(um);
      changed = true;
    }
  }
  if (assignedWeekly.length < 1) {
    const available = shuffle(missions.filter((m: Mission) => m.type === "semanal" && !assignedWeekly.some((um: UserMission) => um.missionId === m.id)));
    if (available.length) {
      const m = available[0];
      const um: UserMission = { userId: Number(userId), missionId: m.id, progress: 0, completed: false, assignedAt: week, completedAt: null };
      userMissions.push(um);
      assignedWeekly.push(um);
      changed = true;
    }
  }
  if (changed) await fs.writeFile(USER_MISSIONS_PATH, JSON.stringify(userMissions, null, 2));
  // Solo mostrar misiones asignadas para hoy/semana y logros secretos completados
  const userProgress = userMissions.filter((um: UserMission) => {
    const m = missions.find((m: Mission) => m.id === um.missionId);
    if (!m) return false;
    if (m.type === "diaria") return um.assignedAt?.slice(0,10) === today;
    if (m.type === "semanal") return um.assignedAt?.startsWith(week);
    if (m.secret) return um.completed;
    return false;
  });
  return NextResponse.json({ missions, userProgress });
}

export async function POST(req: NextRequest) {
  // Reclamar recompensa de misión
  const { userId, missionId } = await req.json();
  const missions: Mission[] = JSON.parse(await fs.readFile(MISSIONS_PATH, "utf-8"));
  const userMissions: UserMission[] = JSON.parse(await fs.readFile(USER_MISSIONS_PATH, "utf-8"));
  const users: User[] = JSON.parse(await fs.readFile(USERS_PATH, "utf-8"));
  const streaks: Streak[] = JSON.parse(await fs.readFile(STREAKS_PATH, "utf-8"));
  const mission = missions.find((m: Mission) => m.id === missionId);
  const userMission = userMissions.find((um: UserMission) => String(um.userId) === String(userId) && um.missionId === missionId);
  if (!mission || !userMission || userMission.completed) {
    return NextResponse.json({ success: false, message: "Misión no válida o ya completada" });
  }
  userMission.completed = true;
  userMission.completedAt = new Date().toISOString();
  // Sumar tokens al usuario
  const userIdx = users.findIndex((u: User) => String(u.id) === String(userId));
  if (userIdx !== -1 && mission.reward?.tokens) {
    users[userIdx].tokens = (users[userIdx].tokens || 0) + mission.reward.tokens;
  }
  // Actualizar streak si es misión diaria
  let streakInfo = null;
  if (mission.type === "diaria") {
    const today = getTodayStr();
    const streak = streaks.find((s: Streak) => s.userId === userId);
    if (!streak) {
      const newStreak: Streak = { userId: Number(userId), currentStreak: 1, maxStreak: 1, lastActivity: today };
      streaks.push(newStreak);
      streakInfo = { currentStreak: 1, maxStreak: 1, newRecord: true };
    } else {
      const last = streak.lastActivity;
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yStr = yesterday.toISOString().slice(0, 10);
      if (last === yStr) {
        streak.currentStreak++;
        if (streak.currentStreak > streak.maxStreak) {
          streak.maxStreak = streak.currentStreak;
          streakInfo = { currentStreak: streak.currentStreak, maxStreak: streak.maxStreak, newRecord: true };
        } else {
          streakInfo = { currentStreak: streak.currentStreak, maxStreak: streak.maxStreak, newRecord: false };
        }
      } else if (last !== today) {
        streak.currentStreak = 1;
        streakInfo = { currentStreak: 1, maxStreak: streak.maxStreak, newRecord: false };
      }
      streak.lastActivity = today;
    }
  }
  await fs.writeFile(USER_MISSIONS_PATH, JSON.stringify(userMissions, null, 2));
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
  await fs.writeFile(STREAKS_PATH, JSON.stringify(streaks, null, 2));
  return NextResponse.json({ success: true, reward: mission.reward, streak: streakInfo });
} 