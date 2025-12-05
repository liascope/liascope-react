import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q");

    if (!q) {
      return NextResponse.json([], { status: 200 });
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
      q
    )}&format=json&addressdetails=1&limit=5`;

    const r = await fetch(url, {
      headers: {
        "User-Agent": "liascope-app/1.0"
      }
    });

    if (!r.ok) {
      return NextResponse.json([], { status: r.status });
    }

    const data = await r.json();

    if (!data || data.length === 0) {
      return NextResponse.json([], { status: 404 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error("Nominatim API Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
