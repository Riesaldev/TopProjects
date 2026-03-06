import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET(req: NextRequest) {
  return proxyRequest(req, "/reports");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "/reports");
}

export async function PATCH(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    if (!payload?.id) {
      return badRequestError("id es requerido");
    }

    const authHeader = req.headers.get("authorization");
    const res = await fetch(`${BACKEND_URL}/reports/${payload.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafely(res, {} as Record<string, unknown>);
    return NextResponse.json(data, { status: res.status });
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

    const authHeader = req.headers.get("authorization");
    const res = await fetch(`${BACKEND_URL}/reports/${payload.id}`, {
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