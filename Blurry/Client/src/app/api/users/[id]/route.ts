import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { User } from "@/types";

const USERS_PATH = path.join(process.cwd(), "data", "users.json");

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await fs.readFile(USERS_PATH, "utf-8");
    const users: User[] = JSON.parse(data);
    const user = users.find((u: User) => String(u.id) === String(params.id));
    
    if (!user) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error en GET /api/users/[id]:", error);
    return NextResponse.json(
      { message: "Error al obtener usuario" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const updates = await req.json();
    const data = await fs.readFile(USERS_PATH, "utf-8");
    const users: User[] = JSON.parse(data);
    const userIndex = users.findIndex((u: User) => String(u.id) === String(params.id));
    
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
    console.error("Error en PATCH /api/users/[id]:", error);
    return NextResponse.json(
      { message: "Error al actualizar usuario" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const data = await fs.readFile(USERS_PATH, "utf-8");
    let users: User[] = JSON.parse(data);
    const userIndex = users.findIndex((u: User) => String(u.id) === String(params.id));
    
    if (userIndex === -1) {
      return NextResponse.json(
        { message: "Usuario no encontrado" },
        { status: 404 }
      );
    }
    
    users.splice(userIndex, 1);
    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    
    return NextResponse.json({ success: true, message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error en DELETE /api/users/[id]:", error);
    return NextResponse.json(
      { message: "Error al eliminar usuario" },
      { status: 500 }
    );
  }
}
