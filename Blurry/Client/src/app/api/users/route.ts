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

export async function PATCH(req: NextRequest) {
  try {
    const updates = await req.json();
    const file = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(file);
    const userIndex = users.findIndex((u: any) => String(u.id) === String(updates.id));

    if (userIndex === -1) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    await fs.writeFile(filePath, JSON.stringify(users, null, 2));
    return NextResponse.json(users[userIndex]);
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();
    const file = await fs.readFile(filePath, "utf-8");
    const users = JSON.parse(file);
    const filteredUsers = users.filter((u: any) => String(u.id) !== String(id));

    if (filteredUsers.length === users.length) {
      return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(filteredUsers, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}