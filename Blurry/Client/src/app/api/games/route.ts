import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object";
}

function normalizeGame(game: unknown) {
  const normalizedGame = (game ?? {}) as Record<string, unknown>;
  return {
    id: normalizedGame.id,
    name: normalizedGame.name,
    description: normalizedGame.description,
    category: normalizedGame.category,
    imageUrl: normalizedGame.image_url ?? normalizedGame.imageUrl,
  };
}

export async function GET(req: NextRequest) {
  const res = await proxyRequest(req, "/games");
  const data = await res.json().catch(() => []);

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  if (Array.isArray(data)) {
    return NextResponse.json(data.map(normalizeGame), { status: res.status });
  }

  return NextResponse.json(isRecord(data) ? normalizeGame(data) : data, { status: res.status });
}