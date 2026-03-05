import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: req.headers.get("authorization") || "",
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const backendUrl = `${BACKEND_URL}/purchases${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`;

  const res = await fetch(backendUrl, {
    method: "GET",
    headers: authHeaders(req),
  });

  const data = await res.json().catch(() => []);
  return NextResponse.json(data, { status: res.status });
}

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  const res = await fetch(`${BACKEND_URL}/purchases`, {
    method: "POST",
    headers: authHeaders(req),
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function PATCH(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "id es requerido" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/purchases/${payload.id}`, {
    method: "PATCH",
    headers: authHeaders(req),
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

export async function DELETE(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "id es requerido" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/purchases/${payload.id}`, {
    method: "DELETE",
    headers: authHeaders(req),
  });

  const data = await res.json().catch(() => ({ success: res.ok }));
  return NextResponse.json(data, { status: res.status });
}