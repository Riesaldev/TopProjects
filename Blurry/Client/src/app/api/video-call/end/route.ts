import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Mission, UserMission, User, AgendaEvent } from "@/types";

const USER_MISSIONS_PATH = path.join(process.cwd(), "data", "userMissions.json");
const MISSIONS_PATH = path.join(process.cwd(), "data", "missions.json");
const USERS_PATH = path.join(process.cwd(), "data", "users.json");
const AGENDA_PATH = path.join(process.cwd(), "data", "agenda.json");

export async function POST(req: NextRequest) {
  const { userId, contactId } = await req.json();
  const missions: Mission[] = JSON.parse(await fs.readFile(MISSIONS_PATH, "utf-8"));
  const userMissions: UserMission[] = JSON.parse(await fs.readFile(USER_MISSIONS_PATH, "utf-8"));
  const users: User[] = JSON.parse(await fs.readFile(USERS_PATH, "utf-8"));
  const agenda: AgendaEvent[] = JSON.parse(await fs.readFile(AGENDA_PATH, "utf-8"));
  const now = new Date();
  // Verificar si hay cita agendada entre ambos
  const cita = agenda.find((e: AgendaEvent) => String(e.userId) === String(userId) && String(e.contactId) === String(contactId));
  if (!cita) return NextResponse.json({ success: false, message: "No hay cita agendada con este usuario" });
  let completed = false;
  let reward = null;
  for (const m of missions) {
    if (m.action === "complete_date") {
      const um = userMissions.find((um: UserMission) => um.userId === userId && um.missionId === m.id);
      if (!um) continue;
      if (!um.completed) {
        um.progress = Math.min(um.progress + 1, m.goal);
        if (um.progress >= m.goal) {
          um.completed = true;
          um.completedAt = now.toISOString();
          completed = true;
          reward = m.reward;
          // Sumar tokens
          const userIdx = users.findIndex((u: User) => String(u.id) === String(userId));
          if (userIdx !== -1 && m.reward?.tokens) {
            users[userIdx].tokens = (users[userIdx].tokens || 0) + m.reward.tokens;
          }
        }
      }
    }
  }
  await fs.writeFile(USER_MISSIONS_PATH, JSON.stringify(userMissions, null, 2));
  await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
  return NextResponse.json({ success: true, completed, reward });
} 