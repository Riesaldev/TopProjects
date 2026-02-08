import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  
  if (!authHeader?.startsWith("Bearer ")) {
    return NextResponse.json({ success: false, message: "Token no proporcionado" }, { status: 401 });
  }

  const token = authHeader.substring(7);
  
  try {
    // Para desarrollo local, simplemente decodificar el token base64
    const decodedToken = JSON.parse(atob(token));
    
    if (decodedToken.userId && decodedToken.email) {
      return NextResponse.json({ success: true, valid: true });
    } else {
      return NextResponse.json({ success: false, message: "Token inválido" }, { status: 401 });
    }
  } catch (error) {
    console.error("Error al verificar token:", error);
    return NextResponse.json({ success: false, message: "Token malformado" }, { status: 401 });
  }
}