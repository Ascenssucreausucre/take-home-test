import { urlStore } from "@/app/lib/store";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { code: string } }
) {
  try {
    const { code } = await params;
    const existing = urlStore.has(code);
    if (!existing) {
      return NextResponse.json(
        { error: "No short URL found" },
        { status: 400 }
      );
    }
    const originalUrl = urlStore.get(code);
    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json(
        { error: "No related URL found" },
        { status: 400 }
      );
    }
    return NextResponse.json({ originalUrl });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
