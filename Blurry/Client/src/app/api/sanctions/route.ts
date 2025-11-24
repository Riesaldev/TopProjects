import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { Sanction } from "@/types";

const filePath = path.join(process.cwd(), "data", "sanctions.json");

export async function GET() {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const sanctions: Sanction[] = JSON.parse(file);
    return NextResponse.json(sanctions);
  } catch (error) {
    console.error("Error reading sanctions file:", error);
    // Si el archivo no existe, devolver un array vacío
    return NextResponse.json([]);
  }
}

export async function PATCH(request: Request) {
  try {
    const { id, estado } = await request.json();
    const file = await fs.readFile(filePath, "utf-8");
    const sanctions: Sanction[] = JSON.parse(file);
    const updatedSanctions = sanctions.map((s: Sanction) => s.id === id ? { ...s, estado } : s);
    await fs.writeFile(filePath, JSON.stringify(updatedSanctions, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating sanctions:", error);
    return NextResponse.json({ success: false, error: "Error updating sanctions" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const file = await fs.readFile(filePath, "utf-8");
  const sanctions: Sanction[] = JSON.parse(file);
  const filteredSanctions = sanctions.filter((s: Sanction) => s.id !== id);
  await fs.writeFile(filePath, JSON.stringify(filteredSanctions, null, 2));
  return NextResponse.json({ success: true });
} 