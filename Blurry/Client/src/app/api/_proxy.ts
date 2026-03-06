import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

function buildForwardHeaders(req: NextRequest): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  const authorization = req.headers.get("authorization");
  if (authorization) {
    headers.Authorization = authorization;
  }

  return headers;
}

async function parseResponsePayload(res: Response): Promise<unknown> {
  const contentType = res.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return res.json().catch(() => ({}));
  }

  const text = await res.text().catch(() => "");
  return text ? { message: text } : {};
}

export async function proxyRequest(
  req: NextRequest,
  backendPath: string,
  methodOverride?: string
) {
  try {
    const url = `${BACKEND_URL}${backendPath}`;
    const method = methodOverride || req.method;
    const headers = buildForwardHeaders(req);

    let body: unknown = undefined;
    if (["POST", "PATCH", "PUT", "DELETE"].includes(method)) {
      body = await req.json().catch(() => undefined);
    }

    const res = await fetch(url, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    const data = await parseResponsePayload(res);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Backend request failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 502 },
    );
  }
} 