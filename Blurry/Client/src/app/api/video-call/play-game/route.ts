import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, parseJsonSafely } from "../../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest): Record<string, string> {
  const authorization = req.headers.get("authorization");
  const headers: Record<string, string> = {};
  if (authorization) {
    headers.authorization = authorization;
  }
  return headers;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const payload = {
      userId: Number(body.userId),
      action: "play_game",
    };

    const res = await fetch(`${BACKEND_URL}/missions/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(req),
      },
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafely(res, { success: false, completed: false, reward: null });
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}
