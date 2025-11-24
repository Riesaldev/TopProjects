import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "reports.json");

export async function GET(req: NextRequest) {
  try {
    const file = await fs.readFile(filePath, "utf-8");
    const reports = JSON.parse(file);
    return NextResponse.json(reports);
  } catch (error) {
    console.error("Error reading reports file:", error);
    return NextResponse.json([]);
  }
}

export async function POST(req: NextRequest) {
  try {
    const newReport = await req.json();
    const file = await fs.readFile(filePath, "utf-8");
    const reports = JSON.parse(file);
    
    if (!newReport.id) {
      newReport.id = `report_${Date.now()}`;
    }
    
    reports.push(newReport);
    await fs.writeFile(filePath, JSON.stringify(reports, null, 2));
    return NextResponse.json(newReport, { status: 201 });
  } catch (error) {
    console.error("Error creating report:", error);
    return NextResponse.json({ error: "Error creating report" }, { status: 500 });
  }
} 