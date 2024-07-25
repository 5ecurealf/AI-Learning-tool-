// app/api/flashcards/route.ts

import { NextResponse } from "next/server";
export interface Flashcard {
  question: string;
  answer: string;
}

const flashcards: Flashcard[] = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "What is the largest ocean on Earth?",
    answer: "Pacific Ocean",
  },
  {
    question: 'Who wrote the novel "To Kill a Mockingbird"?',
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for gold?",
    answer: "Au",
  },
  {
    question: "What is the largest planet in our solar system?",
    answer: "Jupiter",
  },
];

export async function GET() {
  return NextResponse.json(flashcards);
}
