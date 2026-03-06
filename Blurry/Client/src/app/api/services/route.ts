import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET(req: NextRequest) {
  return proxyRequest(req, "/services");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "/services");
}

// Legacy compatibility for callers that send { id, ...updates } to /api/services.
export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("id es requerido");
    }

    const { id, ...updates } = payload;
    const res = await fetch(`${BACKEND_URL}/services/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

// Legacy compatibility for callers that send { id } to /api/services.
export async function DELETE(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("id es requerido");
    }

    const res = await fetch(`${BACKEND_URL}/services/${payload.id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    const data = await parseJsonSafely(res, { success: res.ok });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}