import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  return authorization ? { authorization } : {};
}

function normalizeUserAchievement(a: unknown) {
  const achievement = (a ?? {}) as Record<string, unknown>;
  return {
    id: achievement.id,
    userId: achievement.user_id,
    achievementId: achievement.achievement_id,
    date: achievement.date,
  };
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");
    const res = await fetch(`${BACKEND_URL}/achievements${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`, {
      headers: {
        ...authHeaders(req),
      },
    });
    const data = await res.json().catch(() => []);

    const normalized = userId && Array.isArray(data)
      ? data.map(normalizeUserAchievement)
      : data;

    return NextResponse.json(normalized, { status: res.status });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    const res = await fetch(`${BACKEND_URL}/achievements/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(req),
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json().catch(() => ({}));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "Error al reclamar logro" }, { status: 500 });
  }
}