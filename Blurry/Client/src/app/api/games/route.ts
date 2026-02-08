import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Game } from "@/types";

const GAMES_PATH = path.join(process.cwd(), "data", "games.json");

export async function GET() {
  const data = await fs.readFile(GAMES_PATH, "utf-8");
  const games: Game[] = JSON.parse(data);
  return NextResponse.json(games);
} 