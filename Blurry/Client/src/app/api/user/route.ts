import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeUser(user: any) {
  if (!user || typeof user !== "object") return user;
  return {
    ...user,
    nombre: user.display_name ?? user.nombre,
    codigoPostal: user.location ?? user.codigoPostal,
    actividad: user.is_suspended ? "Baja" : user.actividad ?? "Media",
    estado: user.is_suspended ? "Suspendido" : user.estado ?? "Activo",
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ message: "userId es requerido" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(normalizeUser(data), { status: res.status });
}

// Legacy compatibility for callers sending { id, ...updates }.
export async function PATCH(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ message: "ID de usuario requerido" }, { status: 400 });
  }

  const { id, ...updates } = payload;
  const normalized = {
    ...updates,
    display_name: updates.display_name ?? updates.nombre,
    gender:
      updates.gender ??
      (updates.genero === "Masculino" ? "male" : updates.genero === "Femenino" ? "female" : undefined),
    location: updates.location ?? updates.codigoPostal,
  };

  const res = await fetch(`${BACKEND_URL}/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(normalized),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(normalizeUser(data), { status: res.status });
}
