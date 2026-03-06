import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function normalizeAchievement(item: unknown) {
  const achievement = (item ?? {}) as Record<string, unknown>;
  const tokenReward = Number(achievement.token_reward ?? 0);
  return {
    id: achievement.id,
    name: achievement.name,
    description: achievement.description,
    icon: achievement.icon,
    tokenReward,
    secret: Boolean(achievement.secret),
  };
}

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
    const res = await fetch(`${BACKEND_URL}/achievements/list`, {
      headers: {
        ...authHeaders(req),
      },
    });
    const data = await res.json().catch(() => []);

    const normalized = Array.isArray(data) ? data.map(normalizeAchievement) : [];
    return NextResponse.json(normalized, { status: res.status });
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
