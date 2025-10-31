import { urlStore } from "@/app/lib/store";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ code: string }> }
) {
  try {
    const { code } = await context.params;
    const existing = urlStore.has(code);
    // if (!existing) {
    //   return NextResponse.json(
    //     { error: "No short URL found" },
    //     { status: 400 }
    //   );
    // }
    const originalUrl = urlStore.get(code);
    console.log({ existing, code, originalUrl });
    if (!originalUrl) {
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
