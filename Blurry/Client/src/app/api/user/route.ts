import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { User } from "@/types";

const USERS_PATH = path.join(process.cwd(), "data", "users.json");

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url!);
    const userId = url.searchParams.get("userId");
    const data = await fs.readFile(USERS_PATH, "utf-8");
    const users: User[] = JSON.parse(data);
    
    if (userId) {
      const user = users.find((u: User) => String(u.id) === String(userId));
      if (!user) {
        return NextResponse.json(
          { message: "Usuario no encontrado" },
          { status: 404 }
        );
      }
      return NextResponse.json(user);
    }
    
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error en GET /api/user:", error);
    return NextResponse.json(
      { message: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const updates = await req.json();
    const userId = updates.id;
    
    if (!userId) {
      return NextResponse.json(
        { message: "ID de usuario requerido" },
        { status: 400 }
      );
    }
    
    const data = await fs.readFile(USERS_PATH, "utf-8");
    const users: User[] = JSON.parse(data);
    const userIndex = users.findIndex((u: User) => String(u.id) === String(userId));
    
    if (userIndex === -1) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    
    users[userIndex] = { ...users[userIndex], ...updates };
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    
    return NextResponse.json(users[userIndex]);
  } catch (error) {
    console.error("Error en PATCH /api/user:", error);
    return NextResponse.json(
      { message: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}
