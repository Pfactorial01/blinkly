import { NextRequest, NextResponse } from "next/server";
import { InMemoryDatabase } from "@blinkly/services/database";
import { generateShortUrl } from "@blinkly/services/generateShortUrl";

export async function POST(request: NextRequest) {
  try {
    const db = InMemoryDatabase.getInstance()
    const url = await request.json()
    const shortcode = generateShortUrl()
    db.set(
      shortcode, {
        longUrl: url,
        createdAt: new Date(),
        visited: 0
      }
    )
    const result = {
      shortenedUrl: `http:localhost:3000/${shortcode}`
    }
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ status: "error", message: "An error occurred" }),
      { status: 500 },
    );
  }
}