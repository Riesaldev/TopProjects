import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";
import { backendNetworkError, parseJsonSafely } from "../_errors";

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
    price: normalizedGame.price,
    imageUrl: normalizedGame.image_url ?? normalizedGame.imageUrl,
  };
}

function dedupeGames(games: unknown[]) {
  const seen = new Set<string>();
  const deduped: ReturnType<typeof normalizeGame>[] = [];

  for (const game of games) {
    const normalized = normalizeGame(game);

    // Prefer id when available. Fallback to semantic fields to avoid repeated cards.
    const key = normalized.id != null
      ? `id:${String(normalized.id)}`
      : `sig:${String(normalized.name ?? "").trim().toLowerCase()}|${String(normalized.category ?? "").trim().toLowerCase()}|${String(normalized.description ?? "").trim().toLowerCase()}`;

    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    deduped.push(normalized);
  }

  return deduped;
}

export async function GET(req: NextRequest) {
  try {
    const res = await proxyRequest(req, "/games");
    const data = await parseJsonSafely(res, [] as unknown[]);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    if (Array.isArray(data)) {
      return NextResponse.json(dedupeGames(data), { status: res.status });
    }

    return NextResponse.json(isRecord(data) ? normalizeGame(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}