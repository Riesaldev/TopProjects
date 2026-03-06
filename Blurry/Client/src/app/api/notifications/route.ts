import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

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
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${BACKEND_URL}/notifications`, {
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await parseJsonSafely(res, [] as unknown[]);
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const normalized = Array.isArray(data) ? data.map(normalizeNotification) : [];
    const filtered = userId
      ? normalized.filter((n) => String(n.userId) === String(userId))
      : normalized;

    return NextResponse.json(filtered, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    const normalized = payload
      ? {
          user_id: payload.userId ?? payload.user_id,
          message: payload.message ?? payload.text,
          type: payload.type,
        }
      : payload;
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${BACKEND_URL}/notifications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(normalized),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data?.id ? normalizeNotification(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

// Legacy compatibility for callers that send { id, ...updates } to /api/notifications.
export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("id es requerido");
    }

    const { id, ...updates } = payload;
    const normalized = {
      ...updates,
      user_id: updates.userId ?? updates.user_id,
      message: updates.message ?? updates.text,
    };
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${BACKEND_URL}/notifications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(normalized),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);
    return NextResponse.json(data?.id ? normalizeNotification(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

// Legacy compatibility for callers that send { id } to /api/notifications.
export async function DELETE(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("id es requerido");
    }
    const authHeader = req.headers.get("authorization");

    const res = await fetch(`${BACKEND_URL}/notifications/${payload.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await parseJsonSafely(res, { success: res.ok });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}
