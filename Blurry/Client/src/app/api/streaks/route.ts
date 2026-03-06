import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, badRequestError, parseJsonSafely } from "../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest): Record<string, string> {
  const authorization = req.headers.get("authorization");
  const headers: Record<string, string> = {};
  if (authorization) {
    headers.authorization = authorization;
  }
  return headers;
}

function normalizeStreak(data: unknown, userId: string) {
  const streak = (data ?? {}) as Record<string, unknown>;

  if (!data || streak.error) {
    return {
      userId: Number(userId),
      currentStreak: 0,
      maxStreak: 0,
      lastActivity: null,
    };
  }

  return {
    userId: (streak.user_id as number | undefined) ?? Number(userId),
    currentStreak: (streak.current_streak as number | undefined) ?? 0,
    maxStreak: (streak.max_streak as number | undefined) ?? 0,
    lastActivity: (streak.last_activity as string | null | undefined) ?? null,
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");

  if (!userId) {
    return badRequestError("userId es requerido");
  }

  try {
    const res = await fetch(`${BACKEND_URL}/streaks?userId=${encodeURIComponent(userId)}`, {
      headers: {
        ...authHeaders(req),
      },
    });

    const data = await parseJsonSafely(res, null);
    return NextResponse.json(normalizeStreak(data, userId), { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    const res = await fetch(`${BACKEND_URL}/streaks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(req),
      },
      body: JSON.stringify(payload),
    });

    const data = await parseJsonSafely(res, null);
    const userId = String(payload?.userId ?? "0");
    return NextResponse.json(normalizeStreak(data, userId), { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}
