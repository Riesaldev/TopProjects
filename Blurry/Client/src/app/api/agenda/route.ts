import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { AgendaEvent, Mission, UserMission } from "@/types";

const AGENDA_PATH = path.join(process.cwd(), "data", "agenda.json");
const USER_MISSIONS_PATH = path.join(process.cwd(), "data", "userMissions.json");
const MISSIONS_PATH = path.join(process.cwd(), "data", "missions.json");

async function updateMissionProgress(userId: number, action: string) {
  const missions: Mission[] = JSON.parse(await fs.readFile(MISSIONS_PATH, "utf-8"));
  const userMissions: UserMission[] = JSON.parse(await fs.readFile(USER_MISSIONS_PATH, "utf-8"));
  const now = new Date();
  for (const m of missions) {
    if (m.action === action) {
      const um = userMissions.find((userMission: UserMission) => userMission.userId === userId && userMission.missionId === m.id);
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
  const data = await fs.readFile(AGENDA_PATH, "utf-8");
  const agenda: AgendaEvent[] = JSON.parse(data);
  if (userId) {
    const filteredAgenda = agenda.filter((e: AgendaEvent) => String(e.userId) === String(userId));
    return NextResponse.json(filteredAgenda);
  }
  return NextResponse.json(agenda);
}

export async function POST(req: NextRequest) {
  const newEvent = await req.json();
  const data = await fs.readFile(AGENDA_PATH, "utf-8");
  const agenda: AgendaEvent[] = JSON.parse(data);
  newEvent.id = agenda.length ? Math.max(...agenda.map((e: AgendaEvent) => e.id)) + 1 : 1;
  agenda.push(newEvent);
  await fs.writeFile(AGENDA_PATH, JSON.stringify(agenda, null, 2));
  return NextResponse.json(newEvent);
}


export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const data = await fs.readFile(AGENDA_PATH, "utf-8");
  let agenda: AgendaEvent[] = JSON.parse(data);
  agenda = agenda.filter((e: AgendaEvent) => e.id !== id);
  await fs.writeFile(AGENDA_PATH, JSON.stringify(agenda, null, 2));
  return NextResponse.json({ success: true });
}

export async function PATCH(req: NextRequest) {
  const { id, completed, userId } = await req.json();
  const data = await fs.readFile(AGENDA_PATH, "utf-8");
  const agenda: AgendaEvent[] = JSON.parse(data);
  const idx = agenda.findIndex((e: AgendaEvent) => e.id === id);
  if (idx === -1) return NextResponse.json({ success: false, message: "Cita no encontrada" });
  agenda[idx].completed = completed;
  await fs.writeFile(AGENDA_PATH, JSON.stringify(agenda, null, 2));
  if (completed && userId) {
    await updateMissionProgress(Number(userId), "complete_date");
  }
  return NextResponse.json({ success: true });
} 