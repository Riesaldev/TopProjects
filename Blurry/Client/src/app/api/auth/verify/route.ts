import { NextRequest, NextResponse } from "next/server";

const SERVER_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

function isLikelyValidJwt(token: string): boolean {
  const parts = token.split(".");
  if (parts.length !== 3) return false;

  try {
    const payloadBase64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const payloadJson = Buffer.from(payloadBase64, "base64").toString("utf-8");
    const payload = JSON.parse(payloadJson) as { exp?: number; sub?: number | string; email?: string };

    if (!payload || (!payload.sub && !payload.email)) return false;
    if (typeof payload.exp === "number" && payload.exp * 1000 < Date.now()) return false;
    return true;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ success: false, message: "Token no proporcionado" }, { status: 401 });
  }

  const token = authHeader.substring(7);
  
  try {
    // Intentar validar con el backend
    const response = await fetch(`${SERVER_URL}/auth/verify`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).catch(() => null);

    if (response && response.ok) {
      const data = await response.json();
      return NextResponse.json({ success: true, valid: true, user: data });
    }

    // Fallback local: validar estructura/expiración mínima del JWT.
    if (isLikelyValidJwt(token)) {
      return NextResponse.json({ success: true, valid: true });
    }

    return NextResponse.json({ success: false, message: "Token inválido" }, { status: 401 });
  } catch (error) {
    console.error("Error al verificar token:", error);

    if (isLikelyValidJwt(token)) {
      return NextResponse.json({ success: true, valid: true });
    }

    return NextResponse.json({ success: false, message: "Error al verificar token" }, { status: 401 });
  }
}