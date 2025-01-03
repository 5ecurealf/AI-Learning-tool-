"use client";

import { useState } from "react";
import { UploadForm } from "./ui/uploadForm";
import Topics from "./ui/topics";
import { useThread } from "../contexts/ThreadContext";
import { useEffect } from "react";
import ThreadIdViewer from "./ThreadIdViewer";
import { useTopics } from "@/contexts/TopicsContext";

// This component is loaded as the homepage. When the user starts the website, the first thing to do is generate a thread and set it to the Thread context
// This component renders the form component "UploadForm" on the homepage
// If the file is successfully uploaded, topics context will is set and so LearningDashboard component passing topics as a prop to the Topics component

export function LearningDashboard() {
  const { threadId, setThreadId } = useThread();
  const { topics } = useTopics();
  // const [topics, setTopics] = useState<string[]>([]); // Topics is an array of strings

  useEffect(() => {
    if (!threadId) {
      fetch("/api/assistant/threads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createThread" }),
      })
        .then((res) => res.json())
        .then((data) => setThreadId(data.threadId));
    }
  }, [threadId, setThreadId]);

  return (
    <div className="flex min-h-screen">
      <main className="flex-1 p-8">
        <h1 className="mb-4 text-3xl font-bold text-primary">Data Ingest</h1>
        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Resources</h2>
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg bg-blue-50">
            <UploadForm threadId={threadId} />
          </div>
        </section>
        {topics.length > 0 && <Topics topics={topics} />}
        <ThreadIdViewer />
      </main>
    </div>
  );
}
