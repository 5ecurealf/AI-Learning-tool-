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
  {
    question: "What pigment in plants absorbs sunlight for photosynthesis?",
    options: ["Chlorophyll", "Carotene", "Xanthophyll", "Anthocyanin"],
    correct_answer: "Chlorophyll",
  },
  {
    question: "Which gas is taken in by plants during photosynthesis?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correct_answer: "Carbon Dioxide",
  },
  {
    question: "Which part of the plant primarily conducts photosynthesis?",
    options: ["Roots", "Stem", "Leaves", "Flowers"],
    correct_answer: "Leaves",
  },
  {
    question: "What is the primary product of photosynthesis?",
    options: ["Proteins", "Glucose", "Lipids", "Starch"],
    correct_answer: "Glucose",
  },
  {
    question:
      "Which organelle within plant cells is responsible for photosynthesis?",
    options: ["Mitochondria", "Nucleus", "Chloroplast", "Vacuole"],
    correct_answer: "Chloroplast",
  },
  {
    question:
      "In which cellular process do plants convert glucose into energy?",
    options: ["Photosynthesis", "Glycolysis", "Respiration", "Fermentation"],
    correct_answer: "Respiration",
  },
  {
    question: "What is the main source of energy for photosynthesis?",
    options: ["Water", "Nutrients", "Sunlight", "Oxygen"],
    correct_answer: "Sunlight",
  },
  {
    question:
      "Which molecule acts as the energy carrier in the process of photosynthesis?",
    options: ["ATP", "NADPH", "ADP", "NADP+"],
    correct_answer: "NADPH",
  },
  {
    question:
      "What are the tiny openings on the underside of leaves that allow gas exchange called?",
    options: ["Stomata", "Vacuoles", "Thylakoids", "Grana"],
    correct_answer: "Stomata",
  },
  {
    question:
      "What is the term for the light-independent reactions of photosynthesis?",
    options: [
      "Calvin Cycle",
      "Krebs Cycle",
      "Electron Transport Chain",
      "Light Reactions",
    ],
    correct_answer: "Calvin Cycle",
  },
];

export async function GET() {
  return NextResponse.json(questions);
}
