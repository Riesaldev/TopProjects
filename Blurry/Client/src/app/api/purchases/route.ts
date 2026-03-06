import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

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
  const authHeader = req.headers.get("authorization");
  return {
    "Content-Type": "application/json",
    ...(authHeader ? { Authorization: authHeader } : {}),
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const backendUrl = `${BACKEND_URL}/purchases${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`;

    const res = await fetch(backendUrl, {
      method: "GET",
      headers: authHeaders(req),
    });

    const data = await parseJsonSafely(res, [] as unknown[]);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    if (Array.isArray(data)) {
      return NextResponse.json(data.map(normalizePurchase), { status: res.status });
    }

    return NextResponse.json(isRecord(data) ? normalizePurchase(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    const res = await fetch(`${BACKEND_URL}/purchases`, {
      method: "POST",
      headers: authHeaders(req),
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(isRecord(data) ? normalizePurchase(data) : data, { status: res.status });
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

    const res = await fetch(`${BACKEND_URL}/purchases/${payload.id}`, {
      method: "PATCH",
      headers: authHeaders(req),
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(isRecord(data) ? normalizePurchase(data) : data, { status: res.status });
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

    const res = await fetch(`${BACKEND_URL}/purchases/${payload.id}`, {
      method: "DELETE",
      headers: authHeaders(req),
    });

    const data = await parseJsonSafely(res, { success: res.ok });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}
