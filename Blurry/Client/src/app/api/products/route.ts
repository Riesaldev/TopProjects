import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "products.json");

export async function GET() {
  const file = await fs.readFile(filePath, "utf-8");
  const products = JSON.parse(file);
  return NextResponse.json(products);
} 