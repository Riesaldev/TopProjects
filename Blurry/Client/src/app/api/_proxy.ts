import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function proxyRequest(
  req: NextRequest,
  backendPath: string,
  methodOverride?: string
) {
  const url = `${BACKEND_URL}${backendPath}`;
  const method = methodOverride || req.method;
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Authorization: req.headers.get("authorization") || "",
  };

  let body: any = undefined;
  if (["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
    body = await req.json();
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json(data, { status: res.status });
} 