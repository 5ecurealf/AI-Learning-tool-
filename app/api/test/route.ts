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

    console.log(
      `[SERVER] Received request with threadId: ${threadId}, topics: ${topics}`
    );

    if (!threadId) {
      console.error(`[SERVER] Missing threadId in the request`);
      return NextResponse.json({ success: false });
    }
    if (!topics) {
      console.error(`[SERVER] Missing topics in the request`);
      return NextResponse.json({ success: false });
    }

    // Log prompt creation
    const prompt = generateTestsPrompt(topics);
    console.log(`[SERVER] Generated prompt for topics: ${prompt}`);

    // Adding message to the thread
    const threadMessage = await add_message(threadId, prompt);
    console.log(`[SERVER] add_message response:`, threadMessage);

    // Run the thread
    let run = await run_thread(threadId);
    console.log(`[SERVER] run_thread initial response:`, run);

    run = await waitOnRun(run, threadId);
    console.log(`[SERVER] run_thread final status after waiting:`, run);

    const quiz_string =
      run.required_action?.submit_tool_outputs.tool_calls[0]?.function
        .arguments;
    const tool_call_id =
      run.required_action?.submit_tool_outputs.tool_calls[0]?.id;

    if (quiz_string) {
      const quiz = JSON.parse(quiz_string);
      console.log(`[SERVER] Successfully generated quiz data`, quiz);
      return NextResponse.json({
        success: true,
        quiz: quiz,
        runId: run.id,
        tool_call_id: tool_call_id,
      });
    }

    console.error(`[SERVER] Quiz string not available in run`);
    return NextResponse.json({ success: false });
  } catch (error) {
    console.error(`[SERVER] Error processing request:`, error);
    return NextResponse.json(
      { error: "Failed to process data" },
      { status: 500 }
    );
  }
}

async function run_thread(thread_id: string) {
  console.log(`[SERVER] Running thread for thread_id: ${thread_id}`);

  const run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID!,
  });

  console.log(`[SERVER] run_thread response:`, run);
  return run;
}

async function add_message(thread_id: string, prompt: string) {
  console.log(
    `[SERVER] Adding message to thread: ${thread_id} with prompt: ${prompt}`
  );

  const threadMessage = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: prompt,
  });

  console.log(`[SERVER] add_message response:`, threadMessage);
  return threadMessage;
}

async function waitOnRun(run: OpenAI.Beta.Threads.Runs.Run, thread_id: string) {
  console.log(
    `[SERVER] Waiting for run to complete for thread_id: ${thread_id}`
  );

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  while (run.status === "queued" || run.status === "in_progress") {
    console.log(`[SERVER] Run status: ${run.status}. Checking again...`);
    run = await openai.beta.threads.runs.retrieve(thread_id, run.id);
    await sleep(500); // Wait 500 ms before checking again
  }

  console.log(`[SERVER] Run completed with status: ${run.status}`);
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
