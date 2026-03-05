import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizePurchase(raw: unknown) {
  const purchase = (raw ?? {}) as Record<string, unknown>;

  return {
    id: Number(purchase.id ?? 0),
    userId: Number(purchase.user_id ?? purchase.userId ?? 0),
    productName: String(purchase.product_name ?? purchase.productName ?? ""),
    price: Number(purchase.price ?? 0),
    quantity: Number(purchase.quantity ?? 1),
    total: Number(purchase.total ?? purchase.price ?? 0),
    status: String(purchase.status ?? "pending"),
    date: String(purchase.created_at ?? purchase.date ?? ""),
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

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

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  if (Array.isArray(data)) {
    return NextResponse.json(data.map(normalizePurchase), { status: res.status });
  }

  return NextResponse.json(isRecord(data) ? normalizePurchase(data) : data, { status: res.status });
}

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  const res = await fetch(`${BACKEND_URL}/purchases`, {
    method: "POST",
    headers: authHeaders(req),
    body: JSON.stringify(payload),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(isRecord(data) ? normalizePurchase(data) : data, { status: res.status });
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

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  return NextResponse.json(isRecord(data) ? normalizePurchase(data) : data, { status: res.status });
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
