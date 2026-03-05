import { NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeAchievement(item: unknown) {
  const achievement = (item ?? {}) as Record<string, unknown>;
  return {
    id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    icon: achievement.icon,
    tokenReward: achievement.token_reward,
    secret: achievement.secret,
  };
}

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/achievements/list`);
    const data = await res.json().catch(() => []);

    const normalized = Array.isArray(data) ? data.map(normalizeAchievement) : [];
    return NextResponse.json(normalized, { status: res.status });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
