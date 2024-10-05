// app/api/flashcards/route.ts

import { NextResponse } from "next/server";

// TODO: make use of these types
interface Quiz_data {
  title: string;
  questions: Question[];
}
interface Question {
  question_text: string;
  question_type: "FREE_RESPONSE" | "MULTIPLE_CHOICE";
  choices: string[];
}

// mock data
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

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { threadId, topics } = await request.json();
    if (!threadId) return NextResponse.json({ success: "false" });
    if (!topics) return NextResponse.json({ success: "false" });
    console.log("server side : Received data:", { threadId, topics });

    const prompt = generateTestsPrompt(topics);

    await add_message(threadId, prompt);
    let run = await run_thread(threadId);
    run = await waitOnRun(run, threadId);
    const quiz_string =
      run.required_action?.submit_tool_outputs.tool_calls[0].function.arguments;
    if (quiz_string) {
      const quiz = JSON.parse(quiz_string);
      return NextResponse.json({ success: true, quiz });
    }
    return NextResponse.json({ success: "false" });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process data" },
      { status: 500 }
    );
  }
}

async function run_thread(thread_id: string) {
  const run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID!,
  });
  console.log(run);
  return run;
}

async function add_message(thread_id: string, prompt: string) {
  const threadMessage = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: prompt,
  });
  console.log("add_message response: ", threadMessage);
  return threadMessage;
}

async function waitOnRun(run: OpenAI.Beta.Threads.Runs.Run, thread_id: string) {
  // Define a helper function to delay execution
  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Loop until the run's status is neither "queued" nor "in_progress"
  while (run.status === "queued" || run.status === "in_progress") {
    // Retrieve the updated run status
    run = await openai.beta.threads.runs.retrieve(thread_id, run.id);

    // Wait for 500 milliseconds before the next check
    await sleep(500);
  }

  // Return the final run object
  return run;
}
// Define the function to generate the prompt
function generateTestsPrompt(topics: string[]): string {
  // Join the array of topics into a readable list
  const topicList = topics.join(", ");

  // Build the prompt
  const prompt = `
  Based on the following topics: ${topicList}, please generate a quiz of 10 questions. 
  Include a mixture of open ended and multiple choice.
  The questions should help the user understand the key concepts of these topics.
  Await answers for these questions. Mark the quiz and perform an analysis.`;

  return prompt.trim();
}
