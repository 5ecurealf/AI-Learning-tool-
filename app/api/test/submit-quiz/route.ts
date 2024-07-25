// app/api/submit-quiz/route.ts

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { user_responses, correct_answers } = await request.json();

    // Log the received data
    console.log("Received user responses:", user_responses);
    console.log("Received correct answers:", correct_answers);

    // const response = await fetch("https://external.api/submit", {
    //   // Replace with the actual external API URL
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ user_responses, correct_answers }),
    // });

    // if (!response.ok) {
    //   throw new Error(`Failed to submit quiz: ${response.statusText}`);
    // }

    return NextResponse.json({ message: "Quiz submitted successfully" });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to submit quiz" },
      { status: 500 }
    );
  }
}
