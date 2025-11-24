import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ChatMessage, Mission, UserMission } from "@/types";

const CHATS_PATH = path.join(process.cwd(), "data", "chats.json");
const USER_MISSIONS_PATH = path.join(process.cwd(), "data", "userMissions.json");
const MISSIONS_PATH = path.join(process.cwd(), "data", "missions.json");

async function updateMissionProgress(userId: number, action: string) {
  const missions: Mission[] = JSON.parse(await fs.readFile(MISSIONS_PATH, "utf-8"));
  const userMissions: UserMission[] = JSON.parse(await fs.readFile(USER_MISSIONS_PATH, "utf-8"));
  const now = new Date();
  
  for (const m of missions) {
    if (m.action === action) {
      let um = userMissions.find((userMission: UserMission) => userMission.userId === userId && userMission.missionId === m.id);
      if (!um) {
        um = { userId, missionId: m.id, progress: 0, completed: false, assignedAt: now.toISOString(), completedAt: null };
        userMissions.push(um);
      }
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
  const contactId = url.searchParams.get("contactId");
  const data = await fs.readFile(CHATS_PATH, "utf-8");
  const chats: ChatMessage[] = JSON.parse(data);
  
  if (userId && contactId) {
    const filteredChats = chats.filter((m: ChatMessage) =>
      (String(m.userId) === String(userId) && String(m.contactId) === String(contactId)) ||
      (String(m.userId) === String(contactId) && String(m.contactId) === String(userId))
    );
    return NextResponse.json(filteredChats);
  }
  return NextResponse.json(chats);
}

export async function POST(req: NextRequest) {
  const newMsg = await req.json();
  const data = await fs.readFile(CHATS_PATH, "utf-8");
  const chats: ChatMessage[] = JSON.parse(data);
  newMsg.id = chats.length ? Math.max(...chats.map((m: ChatMessage) => m.id)) + 1 : 1;
  newMsg.timestamp = new Date().toISOString();
  chats.push(newMsg);
  await fs.writeFile(CHATS_PATH, JSON.stringify(chats, null, 2));
  // Detectar si es el primer mensaje entre estos dos usuarios
  const isFirstChat = chats.filter((m: ChatMessage) =>
    ((String(m.userId) === String(newMsg.userId) && String(m.contactId) === String(newMsg.contactId)) ||
     (String(m.userId) === String(newMsg.contactId) && String(m.contactId) === String(newMsg.userId)))
  ).length === 1;
  if (isFirstChat) {
    await updateMissionProgress(Number(newMsg.userId), "new_chat");
  }
  return NextResponse.json(newMsg);
} 