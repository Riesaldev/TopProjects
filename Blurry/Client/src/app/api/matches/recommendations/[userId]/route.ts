import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, parseJsonSafely } from "../../../_errors";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3001";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await context.params;
    const authHeader = req.headers.get("authorization");
    const res = await fetch(`${BACKEND_URL}/matches/recommendations/${userId}`, {
      headers: {
        ...(authHeader ? { Authorization: authHeader } : {}),
      },
    });

    const data = await parseJsonSafely(res, []);
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    return backendNetworkError(error);
  }
}
