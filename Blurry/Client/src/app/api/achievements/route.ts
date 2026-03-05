import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeUserAchievement(a: any) {
  return {
    id: a?.id,
    userId: a?.user_id,
    achievementId: a?.achievement_id,
    date: a?.date,
  };
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const userId = url.searchParams.get("userId");
  const res = await fetch(`${BACKEND_URL}/achievements${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`);
  const data = await res.json().catch(() => []);

  const normalized = userId && Array.isArray(data)
    ? data.map(normalizeUserAchievement)
    : data;

  return NextResponse.json(normalized, { status: res.status });
}

export async function POST(req: NextRequest) {
  const payload = await req.json().catch(() => null);
  const res = await fetch(`${BACKEND_URL}/achievements/claim`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
}