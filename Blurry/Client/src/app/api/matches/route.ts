import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET(req: NextRequest) {
  return proxyRequest(req, "/matches");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "/matches");
}

// Legacy compatibility for callers still using /api/matches with body id for updates.
export async function PATCH(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "id es requerido" }, { status: 400 });
  }

  const { id, ...updates } = payload;
  const res = await fetch(`${BACKEND_URL}/matches/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
    body: JSON.stringify(updates),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}

// Legacy compatibility for callers still using /api/matches with body id for delete.
export async function DELETE(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  if (!payload?.id) {
    return NextResponse.json({ error: "id es requerido" }, { status: 400 });
  }

  const res = await fetch(`${BACKEND_URL}/matches/${payload.id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: req.headers.get("authorization") || "",
    },
  });

  const data = await res.json().catch(() => ({ success: res.ok }));
  return NextResponse.json(data, { status: res.status });
}