import { NextRequest } from "next/server";
import { proxyRequest } from "../_proxy";

export async function GET(req: NextRequest) {
  return proxyRequest(req, "/activity-logs");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "/activity-logs");
} 