import { NextResponse } from "next/server";
import { InMemoryDatabase } from "@blinkly/services/database";

export async function getAllEndpoints() {
    try {
        const db = InMemoryDatabase.getInstance()
        const mapArr = Array.from(db["hashMap"])
        return new NextResponse(JSON.stringify(mapArr), { status: 200 });
    } catch (e) {
        console.error(e);
        return new NextResponse(
            JSON.stringify({ status: "error", message: "An error occurred" }),
            { status: 500 },
        );
    }
}