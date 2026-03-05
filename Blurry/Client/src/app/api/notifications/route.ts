import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeNotification(n: unknown) {
  const notification = (n ?? {}) as Record<string, unknown>;
  return {
    id: notification.id,
    userId: notification.user_id,
    text: String(notification.message || notification.text || ""),
    type: notification.type,
    timestamp: notification.created_at || notification.timestamp,
    read: notification.read,
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  const res = await fetch(`${BACKEND_URL}/notifications`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json().catch(() => []);
  const normalized = Array.isArray(data) ? data.map(normalizeNotification) : [];
  const filtered = userId
    ? normalized.filter((n) => String(n.userId) === String(userId))
    : normalized;

  return NextResponse.json(filtered, { status: res.status });
}

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  const normalized = payload
    ? {
        user_id: payload.userId ?? payload.user_id,
        message: payload.message ?? payload.text,
        type: payload.type,
      }
    : payload;

  const res = await fetch(`${BACKEND_URL}/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(normalized),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data?.id ? normalizeNotification(data) : data, { status: res.status });
}

// Legacy compatibility for callers that send { id, ...updates } to /api/notifications.
export async function PATCH(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ message: "id es requerido" }, { status: 400 });
  }

  const { id, ...updates } = payload;
  const normalized = {
    ...updates,
    user_id: updates.userId ?? updates.user_id,
    message: updates.message ?? updates.text,
  };

  const res = await fetch(`${BACKEND_URL}/notifications/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(normalized),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data?.id ? normalizeNotification(data) : data, { status: res.status });
}

// Legacy compatibility for callers that send { id } to /api/notifications.
export async function DELETE(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ message: "id es requerido" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/notifications/${payload.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json().catch(() => ({ success: res.ok }));
  return NextResponse.json(data, { status: res.status });
}
