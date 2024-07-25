// app/api/flashcards/route.ts

import { NextResponse } from "next/server";

export interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

const questions: Question[] = [
  {
    question: "What is photosynthesis?",
    options: [
      "A process by which plants use water to grow",
      "A process by which plants use sunlight to synthesize foods",
      "A process by which plants use soil nutrients",
      "A process by which plants intake oxygen",
    ],
    correct_answer:
      "A process by which plants use sunlight to synthesize foods",
  },
];

export async function GET() {
  return NextResponse.json(questions);
}
