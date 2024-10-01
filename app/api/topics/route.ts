// app/api/topics/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Respond with the JSON data
    return NextResponse.json(data.suggested_topics);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}
