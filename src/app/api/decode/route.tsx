import { NextRequest, NextResponse } from "next/server";
import { InMemoryDatabase } from "@blinkly/services/database";

export async function POST(request: NextRequest) {
 try {
        const db = InMemoryDatabase.getInstance()
        const shortUrl = await request.json()
        const linkData = db.get(shortUrl)
        if (linkData === undefined) {
            return new NextResponse(
                JSON.stringify({ status: "error", message: "Link not found" }),
                { status: 500 },
              );
        }
        db.updateViewCount(shortUrl)
        const result = { longUrl: linkData.longUrl}
        return new NextResponse(JSON.stringify(result), { status: 200 });
    } catch (e) {
        console.error(e);
        return new NextResponse(
            JSON.stringify({ status: "error", message: "An error occurred" }),
            { status: 500 },
        );
    }
}