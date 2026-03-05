import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";

function normalizeGame(game: unknown) {
  const normalizedGame = (game ?? {}) as Record<string, unknown>;
  return {
    id: normalizedGame.id,
    name: normalizedGame.name,
    description: normalizedGame.description,
    imageUrl: normalizedGame.image_url ?? normalizedGame.imageUrl,
  };
}

export async function GET(req: NextRequest) {
  const res = await proxyRequest(req, "/games");
  const data = await res.json().catch(() => []);
  const normalized = Array.isArray(data) ? data.map(normalizeGame) : [];
  return NextResponse.json(normalized, { status: res.status });
}