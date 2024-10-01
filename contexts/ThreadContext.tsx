"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ThreadContextType {
  threadId: string | null;
  setThreadId: (id: string) => void;
}

const ThreadContext = createContext<ThreadContextType | undefined>(undefined);

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const storedThreadId = localStorage.getItem("threadId");
    if (storedThreadId) {
      setThreadId(storedThreadId);
    }
  }, []);

  const setThreadIdWithStorage = (id: string) => {
    setThreadId(id);
    localStorage.setItem("threadId", id);
  };

  return (
    <ThreadContext.Provider
      value={{ threadId, setThreadId: setThreadIdWithStorage }}
    >
      {children}
    </ThreadContext.Provider>
  );
}

export function useThread() {
  const context = useContext(ThreadContext);
  if (context === undefined) {
    throw new Error("useThread must be used within a ThreadProvider");
  }
  return context;
}
