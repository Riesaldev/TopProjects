import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "tokens.json");

export async function GET(req: NextRequest) {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const tokens = JSON.parse(file);
    return NextResponse.json(tokens);
  } catch (error) {
    console.error("Error reading tokens file:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const newToken = await req.json();
    const file = await fs.readFile(filePath, "utf-8");
    const tokens = JSON.parse(file);
    
    if (!newToken.id) {
      newToken.id = `token_${Date.now()}`;
    }
    
    tokens.push(newToken);
    await fs.writeFile(filePath, JSON.stringify(tokens, null, 2));
    return NextResponse.json(newToken, { status: 201 });
  } catch (error) {
    console.error("Error creating token:", error);
    return NextResponse.json({ error: "Error creating token" }, { status: 500 });
  }
} 