import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, parseJsonSafely } from "../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest): Record<string, string> {
  const authorization = req.headers.get("authorization");
  const headers: Record<string, string> = {};
  if (authorization) {
    headers.authorization = authorization;
  }
  return headers;
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const res = await fetch(`${BACKEND_URL}/missions${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`, {
      headers: {
        ...authHeaders(req),
      },
    });

    const data = await parseJsonSafely(res, { missions: [], userProgress: [] });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    const res = await fetch(`${BACKEND_URL}/missions/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(req),
      },
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafely(res, { success: false, message: "Error al procesar la mision" });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}
