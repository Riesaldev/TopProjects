import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const USERS_PATH = path.join(process.cwd(), "data", "users.json");

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { reason } = await req.json().catch(() => ({ reason: "Suspendido por administrador" }));

    const data = await fs.readFile(USERS_PATH, "utf-8");
    const users = JSON.parse(data);
    const userIndex = users.findIndex((u: any) => String(u.id) === String(id));

    if (userIndex === -1) {
      return NextResponse.json({ message: "Usuario no encontrado" }, { status: 404 });
    }

    users[userIndex] = {
      ...users[userIndex],
      estado: "Suspendido",
      actividad: "Baja",
      is_suspended: true,
      suspension_reason: reason || "Suspendido por administrador",
    };

    await fs.writeFile(USERS_PATH, JSON.stringify(users, null, 2));
    return NextResponse.json(users[userIndex]);
  } catch (error) {
    console.error("Error en PATCH /api/users/[id]/suspend:", error);
    return NextResponse.json({ message: "Error al suspender usuario" }, { status: 500 });
  }
}
