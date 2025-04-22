import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      "https://api.football-data.org/v4/competitions/CL/standings?season=2024",
      {
        headers: {
          "X-Auth-Token": "75f595fb078940918e92eaf78b6f90fc",
        },
      }
    );

    if (!res.ok) {
      const errorText = await res.text();
      console.error("API Error:", errorText);
      return NextResponse.json({ error: errorText }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Catch Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch standings" },
      { status: 500 }
    );
  }
} 
