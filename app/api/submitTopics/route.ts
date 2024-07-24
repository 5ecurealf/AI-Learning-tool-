import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { titles, userInput } = await request.json();

    // Here, you can handle the titles and userInput as needed
    console.log("Received data:", { titles, userInput });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process data" },
      { status: 500 }
    );
  }
}
