import { NextRequest, NextResponse } from "next/server";
import { proxyRequest } from "../_proxy";

function normalizeGame(game: any) {
  return {
    id: game?.id,
    name: game?.name,
    description: game?.description,
    imageUrl: game?.image_url ?? game?.imageUrl,
  };
}

export async function GET(req: NextRequest) {
  const res = await proxyRequest(req, "/games");
  const data = await res.json().catch(() => []);
  const normalized = Array.isArray(data) ? data.map(normalizeGame) : [];
  return NextResponse.json(normalized, { status: res.status });
}