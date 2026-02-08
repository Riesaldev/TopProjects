import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Service } from "@/types";

const filePath = path.join(process.cwd(), "data", "services.json");

export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const services = JSON.parse(file);
    return NextResponse.json(services);
  } catch (error) {
    console.error("Error reading services file:", error);
    // Si el archivo no existe, devolver un array vacío
    return NextResponse.json([]);
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, estado } = await request.json();
    const file = await fs.readFile(filePath, "utf-8");
    let services: Service[] = JSON.parse(file);
    services = services.map((s: Service) => s.id === id ? { ...s, estado } : s);
    await fs.writeFile(filePath, JSON.stringify(services, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating services:", error);
    return NextResponse.json({ success: false, error: "Error updating services" }, { status: 500 });
  }
} 