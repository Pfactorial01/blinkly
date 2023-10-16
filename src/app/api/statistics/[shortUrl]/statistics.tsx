import { NextRequest, NextResponse } from "next/server";
import { InMemoryDatabase } from "@blinkly/services/database";

export async function getStatistics(request: NextRequest, { params }: { params: { shortLink: string } }) {
    try {
        const db = InMemoryDatabase.getInstance()
        const shortUrl = params.shortLink
        const linkData = db.get(shortUrl)
        if (linkData === undefined) {
            return new NextResponse(
                JSON.stringify({ status: "error", message: "Link not found" }),
                { status: 404 },
              );
        }
        return new NextResponse(JSON.stringify(linkData), { status: 200 });
    } catch (e) {
        console.error(e);
        return new NextResponse(
            JSON.stringify({ status: "error", message: "An error occurred" }),
            { status: 500 },
        );
    }
}