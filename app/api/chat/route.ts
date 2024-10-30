import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const body = await req.json();
  const { action, threadId, content, fileId } = body;

  try {
    switch (action) {
      case "createThread":
        const thread = await openai.beta.threads.create();
        console.log(`[SERVER] set thread id : ${thread.id}`);

        return NextResponse.json({ threadId: thread.id });

      case "addMessage":
        const threadMessages = await openai.beta.threads.messages.create(
          threadId,
          {
            role: "user",
            content: content,
            attachments: [
              {
                file_id: fileId,
                tools: [
                  {
                    type: "file_search",
                  },
                ],
              },
            ],
          }
        );
        console.log("[SERVER] new_message response: ", threadMessages);
        return NextResponse.json({ success: true });

      case "runThread":
        let run = await openai.beta.threads.runs.create(threadId, {
          assistant_id: process.env.OPENAI_ASSISTANT_ID!,
        });

        run = await waitOnRun(run, threadId);
        if (run.status === "completed")
          return NextResponse.json({ success: true });
        return NextResponse.json({ success: false });

      case "getMessages":
        const messages = await openai.beta.threads.messages.list(threadId, {
          order: "asc",
        });
        console.log(`[SERVER] openai provides messages: ${messages.data}`);

        return NextResponse.json({ messages: messages.data });

      default:
        return NextResponse.json({ error: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("OpenAI API error:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
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
