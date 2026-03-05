import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeEvent(event: any) {
  return {
    id: event?.id,
    userId: event?.user_id,
    title: event?.title,
    description: event?.description,
    datetime: event?.datetime,
    note: event?.note,
    contactId: event?.contact_id,
    completed: event?.completed,
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const res = await fetch(`${BACKEND_URL}/agenda${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`);
  const data = await res.json().catch(() => []);
  const normalized = Array.isArray(data) ? data.map(normalizeEvent) : [];
  return NextResponse.json(normalized, { status: res.status });
}

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  const normalized = payload
    ? {
        user_id: Number(payload.userId ?? payload.user_id),
        title: payload.title,
        description: payload.description,
        datetime: payload.datetime,
        note: payload.note,
        contact_id: payload.contactId ?? payload.contact_id,
        completed: Boolean(payload.completed),
      }
    : payload;

  const res = await fetch(`${BACKEND_URL}/agenda`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data?.id ? normalizeEvent(data) : data, { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "id es requerido" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/agenda/${payload.id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json().catch(() => ({ success: res.ok }));
  return NextResponse.json(data, { status: res.status });
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

  const res = await fetch(`${BACKEND_URL}/agenda/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data?.id ? normalizeEvent(data) : data, { status: res.status });
}