// app/api/test/results/route.ts

import { NextResponse } from "next/server";

const resultsData = {
  testScore: 92,
  performance: {
    photosynthesis: 85,
    plant_structure: 75,
    plant_reproduction: 65,
    plant_growth: 50, // New topic with a lower score added
  },
  analysis: {
    photosynthesis:
      "You performed exceptionally well in the photosynthesis section, demonstrating a strong grasp of the concepts. However, you could improve your understanding of the detailed mechanisms by reviewing the Calvin cycle.",
    plant_structure:
      "Your performance in the plant structure section was good, but you could improve your knowledge of root and stem functions. Consider focusing on these areas to strengthen your understanding.",
    plant_reproduction:
      "Your plant reproduction performance was relatively weaker compared to other subjects. You should focus on strengthening your understanding of pollination and seed dispersal mechanisms.",
    plant_growth:
      "Your performance in the plant growth section was the weakest. You should focus on understanding the factors affecting plant growth, including nutrient uptake, water transport, and hormonal regulation.",
  },
  topicsToRevise: {
    photosynthesis: [
      "Light-dependent reactions",
      "Calvin cycle",
      "Chloroplast structure",
    ],
    plant_structure: ["Root functions", "Stem anatomy", "Leaf adaptations"],
    plant_reproduction: [
      "Pollination processes",
      "Seed dispersal methods",
      "Flower structures",
    ],
    plant_growth: [
      "Nutrient uptake",
      "Water transport in plants",
      "Hormonal regulation of growth",
    ],
  },
};

export async function GET() {
  return NextResponse.json(resultsData);
}
