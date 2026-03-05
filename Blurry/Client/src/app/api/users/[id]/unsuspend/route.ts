import { NextRequest } from "next/server";
import { proxyRequest } from "../../../_proxy";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyRequest(req, `/users/${id}/unsuspend`, "PUT");
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return proxyRequest(req, `/users/${id}/unsuspend`, "PUT");
}
