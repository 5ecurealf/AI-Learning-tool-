import { NextResponse } from "next/server";
import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: false, // Disable bodyParser to handle form data (file uploads)
  },
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const threadId = formData.get("threadId") as string;
  if (!threadId) return NextResponse.json({ success: "false" });

  const fileId = await upload_file(formData.get("file") as File);
  await new_message_with_file(threadId, fileId);
  let run = await run_thread(threadId);
  run = await waitOnRun(run, threadId);
  const message = await add_message(threadId);
  run = await run_thread(threadId);
  run = await waitOnRun(run, threadId);
  await cancel_run(threadId, run.id);
  await delete_last_message(threadId);

  const topics_string =
    run.required_action?.submit_tool_outputs.tool_calls[0].function.arguments;

  if (topics_string) {
    const topics = JSON.parse(topics_string);
    return NextResponse.json({ success: "true", topics });
  }
  return NextResponse.json({ success: "false" });
}

// upload file to a vector store
// create message referencing the file
// run the thread
// create a new message to prompt the thread to return the topics
// run the thread
// cancel the run
// delete the message from the thread

async function upload_file(file_to_upload: File) {
  const file = await openai.files.create({
    file: file_to_upload,
    purpose: "assistants",
  });
  console.log("upload_file reponse: ", file);
  return file.id;
}

async function new_message_with_file(thread_id: string, file_id: string) {
  const threadMessages = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content: "I have uploaded a new file.",
    attachments: [
      {
        file_id: file_id,
        tools: [
          {
            type: "file_search",
          },
        ],
      },
    ],
  });
  console.log("new_message response: ", threadMessages);
}

async function run_thread(thread_id: string) {
  const run = await openai.beta.threads.runs.create(thread_id, {
    assistant_id: process.env.OPENAI_ASSISTANT_ID!,
  });
  console.log(run);
  return run;
}

async function add_message(thread_id: string) {
  const threadMessage = await openai.beta.threads.messages.create(thread_id, {
    role: "user",
    content:
      'Based on the file I uploaded, can you suggest up to 8 topics that I could learn about? Keep the titles short so I can use them as button titles. Return the answer in a JSON format like this: [{"topic": "Algebra"}, {"topic": "Equations"}, {"topic": "Graphs"}].',
  });
  console.log("add_message response: ", threadMessage);
  return threadMessage;
}

async function cancel_run(thread_id: string, run_id: string) {
  const run = await openai.beta.threads.runs.cancel(thread_id, run_id);
}

async function delete_last_message(thread_id: string) {
  const threadMessages = await openai.beta.threads.messages.list(thread_id);

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
