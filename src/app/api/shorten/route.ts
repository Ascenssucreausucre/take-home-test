import { generateShortCode } from "@/app/lib/generator";
import { urlStore } from "@/app/lib/store";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { originalUrl } = await req.json();

    if (!originalUrl || typeof originalUrl !== "string") {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    try {
      new URL(originalUrl);
    } catch (error) {
      return NextResponse.json(
        { error: "Invalid URL format" },
        { status: 400 }
      );
    }

    let shortCode = generateShortCode();
    while (urlStore.has(shortCode)) {
      shortCode = generateShortCode();
    }

    const entry = urlStore.create(originalUrl, shortCode);

    const baseUrl = "https://cool-domain-name.com";
    const shortUrl = `${baseUrl}/${shortCode}`;

    return NextResponse.json({
      shortUrl,
      code: shortCode,
      originalUrl: entry.originalUrl,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
