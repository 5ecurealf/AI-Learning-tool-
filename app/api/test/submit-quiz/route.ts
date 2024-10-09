import { tool } from "ai";
import { NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize OpenAI instance
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { runId, threadId, toolCallId, userResponses } = await request.json();

    // Log the received data
    console.log("[SERVER] Received user responses:", userResponses);
    console.log("[SERVER] Received runId:", runId);
    console.log("[SERVER] Received threadId:", threadId);
    console.log("[SERVER] Received toolCallId:", toolCallId);

    // Submit user responses
    let run = await submit_tool_outputs(
      threadId,
      runId,
      toolCallId,
      userResponses
    );

    // Wait for the run to complete
    run = await waitOnRun(runId, threadId);

    // Cancel the run after getting the analysis
    await cancel_run(threadId, run.id);

    // Delete the last user message
    await delete_last_message(threadId);

    // Retrieve the analysis result
    const analysis_string =
      run.required_action?.submit_tool_outputs.tool_calls[0].function.arguments;

    if (analysis_string) {
      const quiz_analysis = JSON.parse(analysis_string);
      console.log("[SERVER] Quiz analysis generated:", quiz_analysis);
      return NextResponse.json({ success: true, quiz_analysis });
    } else {
      console.error("[SERVER] No quiz analysis received from OpenAI.");
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("[SERVER] Error submitting quiz:", error);
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
  try {
    console.log(
      `[SERVER] Submitting tool outputs for thread: ${thread_id}, run: ${run_id}`
    );
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
    console.log("[SERVER] Tool outputs submitted successfully:", run);
    return run;
  } catch (error) {
    console.error("[SERVER] Error in submit_tool_outputs:", error);
    throw error;
  }
}

async function waitOnRun(run: OpenAI.Beta.Threads.Runs.Run, thread_id: string) {
  try {
    console.log(
      `[SERVER] Waiting for run to complete for thread: ${thread_id}, run: ${run.id}`
    );
    // Helper function to delay execution
    function sleep(ms: number) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }

    // Loop until the run's status is neither "queued" nor "in_progress"
    while (run.status === "queued" || run.status === "in_progress") {
      console.log(`[SERVER] Run status: ${run.status}. Retrying in 500ms...`);
      // Retrieve the updated run status
      run = await openai.beta.threads.runs.retrieve(thread_id, run.id);
      // Wait for 500 milliseconds before the next check
      await sleep(500);
    }

    console.log(`[SERVER] Run completed with status: ${run.status}`);
    return run;
  } catch (error) {
    console.error(
      `[SERVER] Error while waiting for run to complete for thread: ${thread_id}`,
      error
    );
    throw error;
  }
}

async function cancel_run(thread_id: string, run_id: string) {
  try {
    console.log(`[SERVER] Cancelling run: ${run_id} for thread: ${thread_id}`);
    const run = await openai.beta.threads.runs.cancel(thread_id, run_id);
    console.log("[SERVER] Run cancelled successfully:", run);
  } catch (error) {
    console.error(
      `[SERVER] Error while cancelling run: ${run_id} for thread: ${thread_id}`,
      error
    );
    throw error;
  }
}

async function delete_last_message(thread_id: string) {
  try {
    console.log(`[SERVER] Deleting last user message for thread: ${thread_id}`);
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
      console.log(
        "[SERVER] Last message deleted successfully:",
        deletedMessage
      );
    } else {
      console.log(
        "[SERVER] Message NOT deleted: Could not retrieve message_id from lastUserMessage"
      );
    }
  } catch (error) {
    console.error(
      `[SERVER] Error deleting last user message for thread: ${thread_id}`,
      error
    );
    throw error;
  }
}
