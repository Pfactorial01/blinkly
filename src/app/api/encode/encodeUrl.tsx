import { NextRequest, NextResponse } from "next/server";
import { InMemoryDatabase } from "@blinkly/services/database";
import { generateShortUrl } from "@blinkly/services/generateShortUrl";

export async function encodeUrl(request: NextRequest ) {
  try {
    const db = InMemoryDatabase.getInstance()
    const { url } = await request.json()
    if (url === undefined) return new NextResponse(JSON.stringify({ status: "error", message: "Url is required" }), { status: 400 });
    const shortcode = generateShortUrl()
    db.set(
      shortcode, {
        longUrl: url,
        createdAt: new Date(),
        visited: 0
      }
    )
    const result = {
      shortenedUrl: `http://localhost:3000/${shortcode}`
    }
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({status: "error", message: "An error occured"}),
      { status: 500 },
    );
  }
}