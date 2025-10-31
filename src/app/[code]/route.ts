import { NextRequest, NextResponse } from "next/server";
import { urlStore } from "../lib/store";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  const { code } = await context.params;
  const entry = urlStore.get(code);

  if (!entry) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.redirect(entry.originalUrl);
}
