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
    imageUrl: normalizedGame.image_url ?? normalizedGame.imageUrl,
  };
}

export async function GET(req: NextRequest) {
  try {
    const res = await proxyRequest(req, "/games");
    const data = await parseJsonSafely(res, [] as unknown[]);

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    if (Array.isArray(data)) {
      return NextResponse.json(data.map(normalizeGame), { status: res.status });
    }

    return NextResponse.json(isRecord(data) ? normalizeGame(data) : data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}