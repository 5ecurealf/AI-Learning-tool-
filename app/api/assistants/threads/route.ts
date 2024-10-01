import OpenAI from "openai";
import { NextResponse } from "next/server";

export const openai = new OpenAI();

// Create a new thread
export async function POST() {
  const thread = await openai.beta.threads.create();
  return NextResponse.json({ threadId: thread.id });
}
