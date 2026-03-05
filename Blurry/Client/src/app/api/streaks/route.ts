import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  return authorization ? { authorization } : {};
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
    return NextResponse.json({ error: "userId es requerido" }, { status: 400 });
  }

  try {
    const res = await fetch(`${BACKEND_URL}/streaks?userId=${encodeURIComponent(userId)}`, {
      headers: {
        ...authHeaders(req),
      },
    });

    const data = await res.json().catch(() => null);
    return NextResponse.json(normalizeStreak(data, userId), { status: res.status });
  } catch {
    return NextResponse.json(normalizeStreak(null, userId), { status: 200 });
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

    const data = await res.json().catch(() => null);
    const userId = String(payload?.userId ?? "0");
    return NextResponse.json(normalizeStreak(data, userId), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Error al actualizar streak" }, { status: 500 });
  }
}
