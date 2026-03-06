import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeEvent(event: unknown) {
  const agendaEvent = (event ?? {}) as Record<string, unknown>;
  return {
    id: agendaEvent.id,
    userId: agendaEvent.user_id,
    title: agendaEvent.title,
    description: agendaEvent.description,
    datetime: agendaEvent.datetime,
    note: agendaEvent.note,
    contactId: agendaEvent.contact_id,
    completed: agendaEvent.completed,
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const res = await fetch(`${BACKEND_URL}/agenda${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`);
    const data = await parseJsonSafely(res, [] as unknown[]);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const normalized = Array.isArray(data) ? data.map(normalizeEvent) : [];
    return NextResponse.json(normalized, { status: res.status });
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
    const data = await parseJsonSafely(res, {} as Record<string, unknown>);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data?.id ? normalizeEvent(data) : data, { status: res.status });
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

    const res = await fetch(`${BACKEND_URL}/agenda/${payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    const data = await parseJsonSafely(res, { success: res.ok });
    return NextResponse.json(data, { status: res.status });
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

    const res = await fetch(`${BACKEND_URL}/agenda/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(normalized),
    });
    const data = await parseJsonSafely(res, {} as Record<string, unknown>);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data?.id ? normalizeEvent(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}