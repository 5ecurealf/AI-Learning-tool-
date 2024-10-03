import { NextResponse } from "next/server";
import OpenAI from "openai";
import { threadId } from "worker_threads";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { titles, userInput, threadId } = await request.json();
    if (!titles) return NextResponse.json({ success: "false" });
    // if (!userInput) return NextResponse.json({ success: "false" });
    if (!threadId) return NextResponse.json({ success: "false" });
    console.log("Received data:", { titles, userInput, threadId });

    const prompt = generateRevisionPrompt(titles, userInput);
    await add_message(threadId, prompt);
    let run = await run_thread(threadId);
    run = await waitOnRun(run, threadId);
    await cancel_run(threadId, run.id);
    await delete_last_message(threadId);
    const flashcard_string =
      run.required_action?.submit_tool_outputs.tool_calls[0].function.arguments;
    if (flashcard_string) {
      const flashcards = JSON.parse(flashcard_string);
      return NextResponse.json({ success: true, flashcards });
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

async function cancel_run(thread_id: string, run_id: string) {
  const run = await openai.beta.threads.runs.cancel(thread_id, run_id);
}

async function delete_last_message(thread_id: string) {
  const threadMessages = await openai.beta.threads.messages.list(thread_id, {
    order: "asc",
  });

  const lastUserMessage = threadMessages.data
    .filter((message) => message.role === "user")
    .pop(); // Get the last user message
  const message_id = lastUserMessage?.id;

  if (message_id) {
    const deletedMessage = await openai.beta.threads.messages.del(
      thread_id,
      message_id
    );
    console.log(deletedMessage);
  } else {
    console.log(
      "message NOT deleted successfully: couldn't get message_id from lastUserMessage"
    );
  }
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
function generateRevisionPrompt(titles: string[], userInput: string): string {
  // Join the array of topics into a readable list
  const topicList = titles.join(", ");

  // Build the prompt
  const prompt = `
  Based on the following topics: ${topicList}, and the user's specific request: "${userInput}", 
  please generate a set of revision cards. Each card should include a question and an answer.
  The questions should help the user understand the key concepts of these topics, 
  while the answers should provide clear, informative responses that are easy to remember.`;

  return prompt.trim();
}
