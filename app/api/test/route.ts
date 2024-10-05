// app/api/flashcards/route.ts

import { NextResponse } from "next/server";

interface Quiz_data {
  title: string;
  questions: Question[];
}
interface Question {
  question_text: string;
  question_type: "FREE_RESPONSE" | "MULTIPLE_CHOICE";
  choices: string[];
}

const quiz: Quiz_data = {
  title: "Mathematics Quiz",
  questions: [
    {
      question_text:
        "Explain what a differential equation is and give an example.",
      question_type: "FREE_RESPONSE",
      choices: [],
    },
    {
      question_text: "Which of the following is the integral of (2x)?",
      question_type: "MULTIPLE_CHOICE",
      choices: ["(x^2 + C)", "(x^2)", "(2x + C)", "(2x^2)"],
    },
  ],
};

export async function GET() {
  return NextResponse.json(quiz);
}
