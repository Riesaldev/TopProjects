import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

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
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const res = await fetch(`${BACKEND_URL}/notes${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`);
  const data = await res.json().catch(() => []);
  const normalized = Array.isArray(data) ? data.map(normalizeNote) : [];
  return NextResponse.json(normalized, { status: res.status });
}

export async function POST(req: NextRequest) {
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
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data?.id ? normalizeNote(data) : data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "id es requerido" }, { status: 400 });
  }

  const { id, ...rest } = payload;
  const normalized = {
    ...rest,
    user_id: rest.userId ?? rest.user_id,
    contact_id: rest.contactId ?? rest.contact_id,
  };

  const res = await fetch(`${BACKEND_URL}/notes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data?.id ? normalizeNote(data) : data, { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "id es requerido" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/notes/${payload.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json().catch(() => ({ success: res.ok }));
  return NextResponse.json(data, { status: res.status });
}