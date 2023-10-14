import { NextRequest, NextResponse } from "next/server";

class InMemoryDatabase {
  private static instance: InMemoryDatabase;

  private hashMap: Map<string, {
    longUrl: string;
    createdAt: Date;
    visited: number;
  }> = new Map();

  private constructor() {}

  public static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }

    return InMemoryDatabase.instance;
  }

  public get(key: string): {
    longUrl: string;
    createdAt: Date;
    visited: number;
  } | undefined {
    return this.hashMap.get(key);
  }

  public set(key: string, value: {
    longUrl: string;
    createdAt: Date;
    visited: number;
  }): void {
    this.hashMap.set(key, value);
  }
}

function biject(n: number) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const base = alphabet.length;

  let shortcode = "";
  while (n > 0) {
    shortcode += alphabet[n % base];
    n = Math.floor(n / base);
  }

  return shortcode.split("").reverse().join("");
}

const shortenUrl = ({url}: {url: string}) => {
  const id = Math.random().toString(36).substring(7);
  const shortcode = biject(parseInt(id, 36));
  return shortcode;
}

export async function POST(request: NextRequest) {
  try {
    const db = InMemoryDatabase.getInstance()
    const url = await request.json()
    const shortcode = shortenUrl({url})
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
    console.log(db)
    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (e) {
    console.error(e);
    return new NextResponse(
      JSON.stringify({ status: "error", message: "An error occurred" }),
      { status: 500 },
    );
  }
}