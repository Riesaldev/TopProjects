import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get("q") || "";
  
  if (!q) {
    return NextResponse.json([], { status: 200 });
  }

  const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
  
  try {
    const response = await fetch(`${backendUrl}/chats/search/all?q=${encodeURIComponent(q)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: req.headers.get("authorization") || "",
      },
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: `Backend responded with status ${response.status}`, details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Desconocido";
    return NextResponse.json(
      { error: "Fetch to backend failed", message: message },
      { status: 500 }
    );
  }
}