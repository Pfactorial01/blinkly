import { NextRequest, NextResponse } from "next/server";

const hashMap = {}

export async function POST(request: NextRequest) {
  try {
    const url = await request.json()
    
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ status: "error", message: "An error occurred" }),
      { status: 500 },
    );
  }
}