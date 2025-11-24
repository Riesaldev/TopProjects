import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "matches.json");

export async function GET(req: NextRequest) {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const matches = JSON.parse(file);
    return NextResponse.json(matches);
  } catch (error) {
    console.error("Error reading matches file:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const newMatch = await req.json();
    const file = await fs.readFile(filePath, "utf-8");
    const matches = JSON.parse(file);
    
    if (!newMatch.id) {
      newMatch.id = `match_${Date.now()}`;
    }
    
    matches.push(newMatch);
    await fs.writeFile(filePath, JSON.stringify(matches, null, 2));
    return NextResponse.json(newMatch, { status: 201 });
  } catch (error) {
    console.error("Error creating match:", error);
    return NextResponse.json({ error: "Error creating match" }, { status: 500 });
  }
} 