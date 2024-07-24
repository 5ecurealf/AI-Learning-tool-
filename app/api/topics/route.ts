// app/api/topics/route.ts
import { NextResponse } from "next/server";
import path from "path";
import { promises as fs } from "fs";

export async function GET() {
  try {
    // Define the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), "data");
    const fileContents = await fs.readFile(
      path.join(jsonDirectory, "mock-data.json"),
      "utf8"
    );

    // Parse the JSON data
    const data = JSON.parse(fileContents);

    // Respond with the JSON data
    return NextResponse.json(data.suggested_topics);
  } catch (error) {
    console.error("Error reading JSON file:", error);
    return NextResponse.json({ error: "Failed to read data" }, { status: 500 });
  }
}
