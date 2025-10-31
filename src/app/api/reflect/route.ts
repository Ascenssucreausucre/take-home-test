import { NextResponse } from "next/server";
import { urlStore } from "@/app/lib/store";

export const runtime = "nodejs";

export async function GET() {
  const allUrls = urlStore.getAll();
  return NextResponse.json({ count: allUrls.length, data: allUrls });
}
