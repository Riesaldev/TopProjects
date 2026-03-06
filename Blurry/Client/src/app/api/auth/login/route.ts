import { NextRequest, NextResponse } from "next/server";
import { backendNetworkError, parseJsonSafely } from "../../_errors";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(`${SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await parseJsonSafely(response, {} as Record<string, unknown>);

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || "Error de autenticación" },
        { status: response.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return backendNetworkError(error);
  }
}