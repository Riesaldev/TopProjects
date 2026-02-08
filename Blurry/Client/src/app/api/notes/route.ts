import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Note } from "@/types";

const NOTES_PATH = path.join(process.cwd(), "data", "notes.json");

export async function GET(req: NextRequest) {
  const url = new URL(req.url!);
  const userId = url.searchParams.get("userId");
  const data = await fs.readFile(NOTES_PATH, "utf-8");
  let notes: Note[] = JSON.parse(data);
  if (userId) {
    notes = notes.filter((n: Note) => String(n.userId) === String(userId));
  }
  return NextResponse.json(notes);
}

export async function POST(req: NextRequest) {
  const newNote = await req.json();
  const data = await fs.readFile(NOTES_PATH, "utf-8");
  const notes: Note[] = JSON.parse(data);
  // Si ya existe una nota para este userId y contactId, sobrescribirla
  const idx = notes.findIndex((n: Note) => String(n.userId) === String(newNote.userId) && String(n.contactId) === String(newNote.contactId));
  if (idx !== -1) {
    notes[idx] = { ...notes[idx], ...newNote, id: notes[idx].id, date: new Date().toISOString() };
    await fs.writeFile(NOTES_PATH, JSON.stringify(notes, null, 2));
    return NextResponse.json(notes[idx]);
  }
  newNote.id = notes.length ? Math.max(...notes.map((n: Note) => n.id)) + 1 : 1;
  newNote.date = new Date().toISOString();
  notes.push(newNote);
  await fs.writeFile(NOTES_PATH, JSON.stringify(notes, null, 2));
  return NextResponse.json(newNote);
}


export async function PATCH(req: NextRequest) {
  const { id, ...rest } = await req.json();
  const data = await fs.readFile(NOTES_PATH, "utf-8");
  let notes: Note[] = JSON.parse(data);
  notes = notes.map((n: Note) => n.id === id ? { ...n, ...rest } : n);
  await fs.writeFile(NOTES_PATH, JSON.stringify(notes, null, 2));
  return NextResponse.json({ success: true });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  const data = await fs.readFile(NOTES_PATH, "utf-8");
  let notes: Note[] = JSON.parse(data);
  notes = notes.filter((n: Note) => n.id !== id);
  await fs.writeFile(NOTES_PATH, JSON.stringify(notes, null, 2));
  return NextResponse.json({ success: true });
} 