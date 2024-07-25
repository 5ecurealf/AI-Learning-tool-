// app/api/test/results/route.ts

import { NextResponse } from "next/server";

const resultsData = {
  testScore: 92,
  performance: {
    mathematics: 85,
    english: 75,
    science: 65,
    history: 70, // New topic added
  },
  analysis: {
    mathematics:
      "You performed exceptionally well in the mathematics section, demonstrating a strong grasp of the concepts. However, you could improve your problem-solving skills by practicing more complex word problems.",
    english:
      "Your performance in the English section was good, but you could improve your reading comprehension and writing skills. Consider focusing on practice exercises that target these areas.",
    science:
      "Your science performance was relatively weaker compared to other subjects. You should focus on strengthening your understanding of scientific concepts and improving your problem-solving skills in this area.",
    history:
      "Your performance in history shows a good understanding of historical events, but you could benefit from a deeper analysis of historical contexts and causes.", // New topic analysis added
  },
  topicsToRevise: {
    mathematics: [
      "Complex word problems",
      "Algebra concepts",
      "Geometry formulas",
    ],
    english: [
      "Reading comprehension strategies",
      "Essay writing structure",
      "Grammar and punctuation rules",
    ],
    science: [
      "Scientific method and hypothesis testing",
      "Principles of physics",
      "Biological processes",
    ],
    history: [
      "Important historical events",
      "Historical analysis and interpretation",
      "Historical contexts",
    ], // New topic added
  },
};

export async function GET() {
  return NextResponse.json(resultsData);
}
