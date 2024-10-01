"use client";

import { useState } from "react";
import { UploadForm } from "./ui/uploadForm";
import Topics from "./ui/topics";
import { useThread } from "../contexts/ThreadContext";
import { useEffect } from "react";
import ThreadIdViewer from "./ThreadIdViewer";

export function LearningDashboard() {
  const { threadId, setThreadId } = useThread();
  const [topics, setTopics] = useState<string[]>([]); // Topics is an array of strings

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
            <UploadForm setTopics={setTopics} threadId={threadId} />
          </div>
        </section>
        {topics.length > 0 && <Topics topics={topics} />}
        <ThreadIdViewer />
      </main>
    </div>
  );
}
