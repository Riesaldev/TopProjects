import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  return authorization ? { authorization } : {};
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    const res = await fetch(`${BACKEND_URL}/missions${userId ? `?userId=${encodeURIComponent(userId)}` : ""}`, {
      headers: {
        ...authHeaders(req),
      },
    });

    const data = await res.json().catch(() => ({ missions: [], userProgress: [] }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ missions: [], userProgress: [] }, { status: 200 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json().catch(() => null);
    const res = await fetch(`${BACKEND_URL}/missions/claim`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(req),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({ success: false, message: "Error al procesar la mision" }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, message: "Error al procesar la mision" }, { status: 500 });
  }
}
