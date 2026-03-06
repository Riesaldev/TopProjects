import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeUser(user: unknown) {
  if (!user || typeof user !== "object") return user;
  const normalizedUser = user as Record<string, unknown>;

  const isSuspended = Boolean(normalizedUser.is_suspended);
  return {
    ...normalizedUser,
    nombre: normalizedUser.display_name ?? normalizedUser.nombre,
    codigoPostal: normalizedUser.location ?? normalizedUser.codigoPostal,
    actividad: isSuspended ? "Baja" : normalizedUser.actividad ?? "Media",
    estado: isSuspended ? "Suspendido" : normalizedUser.estado ?? "Activo",
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return badRequestError("userId es requerido");
    }

    const authHeader = req.headers.get("authorization");
    const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);
    return NextResponse.json(normalizeUser(data), { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

// Legacy compatibility for callers sending { id, ...updates }.
export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("ID de usuario requerido");
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
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${BACKEND_URL}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(normalized),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);
    return NextResponse.json(normalizeUser(data), { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}
