import { NextRequest } from "next/server";
import { proxyRequest } from "../../_proxy";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return proxyRequest(req, `/reports-generated/${id}`);
}

export async function PATCH(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return proxyRequest(req, `/reports-generated/${id}`);
}

export async function DELETE(req: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  return proxyRequest(req, `/reports-generated/${id}`);
} 