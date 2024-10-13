"use client";

import React, { createContext, useContext, useState } from "react";

interface ChatThreadIdContextType {
  chatThreadId: string | null;
  setChatThreadId: (id: string) => void;
}

const ChatThreadIdContext = createContext<ChatThreadIdContextType | undefined>(
  undefined
);

export function ChatThreadIdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [chatThreadId, setChatThreadId] = useState<string | null>(null);

  return (
    <ChatThreadIdContext.Provider value={{ chatThreadId, setChatThreadId }}>
      {children}
    </ChatThreadIdContext.Provider>
  );
}

export function useChatThreadId() {
  const context = useContext(ChatThreadIdContext);
  if (context === undefined) {
    throw new Error(
      "useChatThreadId must be used within a ChatThreadIdProvider"
    );
  }
  return context;
}
