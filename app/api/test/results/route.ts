// app/api/test/results/route.ts

import { NextResponse } from "next/server";

const resultsData = {
  testScore: 0,
  performance: [
    {
      subject: "Differential Equation",
      score: 0,
    },
    {
      subject: "Integration",
      score: 0,
    },
  ],
  analysis: [
    {
      subject: "Differential Equation",
      feedback:
        "Your understanding of differential equations needs improvement. A differential equation relates a function with its derivatives. Consider reviewing definitions and basic examples.",
    },
    {
      subject: "Integration",
      feedback:
        "Your integration concepts need to be revisited. Remember that the integral of a function includes a constant of integration, represented as C.",
    },
  ],
  topicsToRevise: [
    {
      subject: "Differential Equation",
      topics: [
        "Definition of differential equations",
        "Simple examples of differential equations",
      ],
    },
    {
      subject: "Integration",
      topics: [
        "Rules of integration",
        "Importance of the constant of integration",
      ],
    },
  ],
};

export async function GET() {
  return NextResponse.json(resultsData);
}
