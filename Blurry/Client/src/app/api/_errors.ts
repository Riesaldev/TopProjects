import { NextResponse } from "next/server";

export function backendNetworkError(error: unknown) {
  return NextResponse.json(
    {
      error: "Backend request failed",
      details: error instanceof Error ? error.message : "Unknown error",
    },
    { status: 502 },
  );
}

export function badRequestError(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function parseJsonSafely<T>(res: Response, fallback: T): Promise<T> {
  return res.json().catch(() => fallback);
}
