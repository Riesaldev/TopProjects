import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest): Record<string, string> {
  const authHeader = req.headers.get("authorization");
  return {
    "Content-Type": "application/json",
    ...(authHeader ? { Authorization: authHeader } : {}),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function normalizeNote(note: unknown) {
  const normalizedNote = (note ?? {}) as Record<string, unknown>;
  return {
    id: normalizedNote.id,
    userId: normalizedNote.user_id,
    contactId: normalizedNote.contact_id,
    content: normalizedNote.content,
    date: normalizedNote.date,
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const res = await fetch(`${BACKEND_URL}/notes${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`, {
      headers: authHeaders(req),
    });
    const data = await parseJsonSafely(res, [] as unknown[]);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    if (Array.isArray(data)) {
      return NextResponse.json(data.map(normalizeNote), { status: res.status });
    }

    return NextResponse.json(isRecord(data) ? normalizeNote(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    const normalized = payload
      ? {
          user_id: Number(payload.userId ?? payload.user_id),
          contact_id: payload.contactId ?? payload.contact_id,
          content: payload.content,
        }
      : payload;

    const res = await fetch(`${BACKEND_URL}/notes`, {
      method: "POST",
      headers: authHeaders(req),
      body: JSON.stringify(normalized),
    });
    const data = await parseJsonSafely(res, {} as Record<string, unknown>);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data?.id ? normalizeNote(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("id es requerido");
    }

    const { id, ...rest } = payload;
    const normalized = {
      ...rest,
      user_id: rest.userId ?? rest.user_id,
      contact_id: rest.contactId ?? rest.contact_id,
    };

    const res = await fetch(`${BACKEND_URL}/notes/${id}`, {
      method: "PATCH",
      headers: authHeaders(req),
      body: JSON.stringify(normalized),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data?.id ? normalizeNote(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("id es requerido");
    }

    const res = await fetch(`${BACKEND_URL}/notes/${payload.id}`, {
      method: "DELETE",
      headers: authHeaders(req),
    });

    const data = await parseJsonSafely(res, { success: res.ok });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}