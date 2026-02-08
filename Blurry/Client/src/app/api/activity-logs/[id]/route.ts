import { NextRequest } from "next/server";
import { proxyRequest } from "../../_proxy";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(req, `/activity-logs/${params.id}`);
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(req, `/activity-logs/${params.id}`);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  return proxyRequest(req, `/activity-logs/${params.id}`);
} 