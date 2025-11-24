import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "users.json");

export async function GET(req: NextRequest) {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(file);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error reading users file:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const newUser = await req.json();
    const file = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(file);
    
    if (!newUser.id) {
      newUser.id = Math.max(...users.map((u: any) => u.id || 0)) + 1;
    }
    
    users.push(newUser);
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
} 