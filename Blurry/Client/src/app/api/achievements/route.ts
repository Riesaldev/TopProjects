import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Achievement, UserAchievement, User } from "@/types";

const ACHIEVEMENTS_PATH = path.join(process.cwd(), "data", "achievements.json");
const USERS_PATH = path.join(process.cwd(), "data", "users.json");

export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  const userId = url.searchParams.get("userId");
  const data = await fs.readFile(ACHIEVEMENTS_PATH, "utf-8");
  const all: (Achievement | UserAchievement)[] = JSON.parse(data);
  if (userId) {
    // Solo logros del usuario
    return NextResponse.json(all.filter((a: Achievement | UserAchievement) => 'userId' in a && String(a.userId) === String(userId)));
  }
  // Todos los logros y asignaciones
  return NextResponse.json(all);
}

export async function POST(req: NextRequest) {
  const { userId, achievementId } = await req.json();
  const data = await fs.readFile(ACHIEVEMENTS_PATH, "utf-8");
  const all: (Achievement | UserAchievement)[] = JSON.parse(data);
  // Ver si ya tiene ese logro
  if (all.some((a: Achievement | UserAchievement) => 'userId' in a && a.userId === userId && a.achievementId === achievementId)) {
    return NextResponse.json({ success: false, message: "Ya tienes este logro" });
  }
  // Buscar info del logro
  const achievement = all.find((a: Achievement | UserAchievement) => 'id' in a && 'name' in a && a.id === achievementId) as Achievement;
  if (!achievement) return NextResponse.json({ success: false, message: "Logro no encontrado" });
  // Asignar logro
  const newAch: UserAchievement = {
    id: Date.now(),
    userId,
    achievementId,
    date: new Date().toISOString()
  };
  all.push(newAch);
  await fs.writeFile(ACHIEVEMENTS_PATH, JSON.stringify(all, null, 2));
  // Sumar tokens al usuario
  const usersData = await fs.readFile(USERS_PATH, "utf-8");
  const users: User[] = JSON.parse(usersData);
  const updatedUsers = users.map((u: User) => String(u.id) === String(userId) ? { ...u, tokens: (u.tokens || 0) + (achievement.tokenReward || 0) } : u);
  await fs.writeFile(USERS_PATH, JSON.stringify(updatedUsers, null, 2));
  return NextResponse.json({ success: true, achievement: newAch, tokens: achievement.tokenReward });
}

// La funcionalidad GET_list se maneja en /api/achievements/list/route.ts 