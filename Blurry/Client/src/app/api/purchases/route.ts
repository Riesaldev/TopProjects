import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Mission, UserMission, Purchase } from "@/types";

const PURCHASES_PATH = path.join(process.cwd(), "data", "purchases.json");
const USER_MISSIONS_PATH = path.join(process.cwd(), "data", "userMissions.json");
const MISSIONS_PATH = path.join(process.cwd(), "data", "missions.json");

async function updateMissionProgress(userId: number, action: string) {
  const missions: Mission[] = JSON.parse(await fs.readFile(MISSIONS_PATH, "utf-8"));
  const userMissions: UserMission[] = JSON.parse(await fs.readFile(USER_MISSIONS_PATH, "utf-8"));
  const now = new Date();
  for (const m of missions) {
    if (m.action === action) {
      const um = userMissions.find((um: UserMission) => um.userId === userId && um.missionId === m.id);
      if (!um) continue;
      if (!um.completed) {
        um.progress = Math.min(um.progress + 1, m.goal);
        if (um.progress >= m.goal) {
          um.completed = true;
          um.completedAt = now.toISOString();
        }
      }
    }
  }
  await fs.writeFile(USER_MISSIONS_PATH, JSON.stringify(userMissions, null, 2));
}


export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  const userId = url.searchParams.get("userId");
  const data = await fs.readFile(PURCHASES_PATH, "utf-8");
  let purchases: Purchase[] = JSON.parse(data);
  if (userId) {
    purchases = purchases.filter((p: Purchase) => String(p.userId) === String(userId));
  }
  return NextResponse.json(purchases);
}

export async function POST(req: NextRequest) {
  const newPurchase = await req.json();
  const data = await fs.readFile(PURCHASES_PATH, "utf-8");
  const purchases: Purchase[] = JSON.parse(data);
  
  newPurchase.id = purchases.length ? Math.max(...purchases.map((p: Purchase) => p.id)) + 1 : 1;
  purchases.push(newPurchase);
  await fs.writeFile(PURCHASES_PATH, JSON.stringify(purchases, null, 2));
  
  // Si es un juego, actualizar misión
  if (newPurchase.productName?.toLowerCase().includes("juego")) {
    await updateMissionProgress(Number(newPurchase.userId), "play_game");
  }
  
  return NextResponse.json(newPurchase);
} 