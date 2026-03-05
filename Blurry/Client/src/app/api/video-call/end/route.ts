import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function authHeaders(req: NextRequest) {
  const authorization = req.headers.get("authorization");
  return authorization ? { authorization } : {};
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const payload = {
      userId: Number(body.userId),
      action: "complete_date",
      contactId: body.contactId ? Number(body.contactId) : undefined,
    };

    const res = await fetch(`${BACKEND_URL}/missions/progress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(req),
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json().catch(() => ({ success: false, completed: false, reward: null }));
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ success: false, completed: false, reward: null }, { status: 500 });
  }
}
