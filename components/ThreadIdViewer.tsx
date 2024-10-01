"use client";

import { useThread } from "@/contexts/ThreadContext";

export default function ThreadIdViewer() {
  const { threadId } = useThread();

  return (
    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-md shadow-lg text-sm">
      <p>Thread ID: {threadId || "Not set"}</p>
    </div>
  );
}
