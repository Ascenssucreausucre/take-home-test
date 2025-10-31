import { NextRequest, NextResponse } from "next/server";
import { urlStore } from "../lib/store";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  const entry = urlStore.get(params.code);
  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.redirect(entry.originalUrl);
}
