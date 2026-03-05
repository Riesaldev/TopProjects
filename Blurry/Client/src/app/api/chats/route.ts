import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeMessage(m: unknown) {
  const message = (m ?? {}) as Record<string, unknown>;
  return {
    id: message.id,
    userId: message.user_id,
    contactId: message.contact_id,
    senderId: message.sender_id,
    content: message.content,
    timestamp: message.timestamp,
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const contactId = url.searchParams.get("contactId");

  const qs = new URLSearchParams();
  if (userId) qs.set("userId", userId);
  if (contactId) qs.set("contactId", contactId);

  const res = await fetch(`${BACKEND_URL}/chats${qs.toString() ? `?${qs.toString()}` : ""}`, {
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json().catch(() => []);
  const normalized = Array.isArray(data) ? data.map(normalizeMessage) : [];
  return NextResponse.json(normalized, { status: res.status });
}

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  const normalized = payload
    ? {
        user_id: payload.userId ?? payload.user_id,
        contact_id: payload.contactId ?? payload.contact_id,
        sender_id: payload.senderId ?? payload.sender_id ?? payload.userId,
        content: payload.content,
      }
    : payload;

  const res = await fetch(`${BACKEND_URL}/chats`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(normalized),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data?.id ? normalizeMessage(data) : data, { status: res.status });
}