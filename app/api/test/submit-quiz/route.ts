// app/api/submit-quiz/route.ts
import { tool } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";
// this endpoint recieves the user inputs
// posts data to openai function outputs
// take the run_id from the response (TODO : check I get this straight away)
// get the analysis payload from the run_id information using the endpoint
// cancel the run
// delete the message
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { runId, threadId, toolCallId, userResponses } = await request.json();

    // Log the received data
    console.log("Received user responses:", userResponses);
    console.log("Received runId:", runId);

    let run = await submit_tool_outputs(
      threadId,
      runId,
      toolCallId,
      userResponses
    );

    run = await waitOnRun(runId, threadId);
    await cancel_run(threadId, run.id);
    await delete_last_message(threadId);
    const analysis_string =
      run.required_action?.submit_tool_outputs.tool_calls[0].function.arguments;
    if (analysis_string) {
      const quiz_analysis = JSON.parse(analysis_string);
      return NextResponse.json({ success: true, quiz_analysis });
    }
    return NextResponse.json({ success: "false" });
  } catch (error) {
    console.error("Error submitting quiz:", error);
    return NextResponse.json(
      { error: "Failed to process data" },
      { status: 500 }
    );
  }
}

async function submit_tool_outputs(
  thread_id: string,
  run_id: string,
  tool_call_id: string,
  output: string
) {
  const run = await openai.beta.threads.runs.submitToolOutputs(
    thread_id,
    run_id,
    {
      tool_outputs: [
        {
          tool_call_id: tool_call_id,
          output: output,
        },
      ],
    }
  );

  console.log(run);
  return run;
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
