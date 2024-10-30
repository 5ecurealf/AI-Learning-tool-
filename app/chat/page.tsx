"use client";
import { useState, useEffect, useRef } from "react";
import { useChatThreadId } from "@/contexts/ChatThreadContext";
import ThreadIdViewer from "@/components/ThreadIdViewer";
import { useFileId } from "@/contexts/FileIdContext";
import { Message } from "openai/resources/beta/threads/messages.mjs";

export default function Page() {
  const { chatThreadId, setChatThreadId } = useChatThreadId();
  const { fileId } = useFileId();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]); // Trigger this effect whenever `messages` changes

  useEffect(() => {
    const getThread = async () => {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createThread" }),
      });
      const data = await res.json();
      console.log(`[CLIENT] received ThreadId: ${data.threadId}`);
      setChatThreadId(data.threadId); // Set the thread ID in state
    };

    if (!chatThreadId) {
      getThread(); // Only create the thread if it hasn't been created
    }
  }, [chatThreadId]); // Dependency array watches chatThreadId

  // Separate useEffect to fetch messages after chatThreadId is set
  useEffect(() => {
    const fetchMessages = async () => {
      if (!chatThreadId) return; // Early return if chatThreadId is undefined

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "getMessages", threadId: chatThreadId }),
      });

      const data = await res.json();
      console.log(`[CLIENT] messages from server: ${data.messages}`);
      setMessages(data.messages);
    };

    if (chatThreadId) {
      fetchMessages(); // Fetch messages only if chatThreadId is defined
    }
  }, [chatThreadId]); // This effect runs whenever chatThreadId changes

  const fetchMessages = async () => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "getMessages", threadId: chatThreadId }),
    });
    const data = await res.json();
    console.log(`[CLIENT] messages from server : ${data.messages}`);
    setMessages(data.messages);
  };

  const sendMessage = async (e) => {
    console.log(`[CLIENT] button registered`);

    e.preventDefault();
    if (!input.trim() || isLoading) return;
    console.log(`[CLIENT] 1`);
    console.log(`[CLIENT] fileId: ${fileId}, chatThreadId: ${chatThreadId}`);

    if (!fileId || !chatThreadId) return;
    console.log(`[CLIENT] 2`);

    setIsLoading(true);
    try {
      // Add user message
      let res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "addMessage",
          threadId: chatThreadId,
          fileId,
          content: input,
        }),
      });
      const data = await res.json();
      console.log(`[CLIENT] postign messages success: ${data.success}`); // ignore error

      setInput("");
      console.log(`[CLIENT] updating messages with fetchMessages`); // ignore error
      await fetchMessages();

      // run thread
      console.log(`[CLIENT]  runnign the thread`); // ignore error
      await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "runThread",
          threadId: chatThreadId,
        }),
      });

      // fetch messages
      console.log(`[CLIENT] updating messages with fetchMessages`); // ignore error
      await fetchMessages();
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "rgb(238, 195, 232)",
        }}
      >
        Chat Page
      </p>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Chat with AI Assistant</h1>
        <div
          ref={scrollRef}
          className="bg-gray-100 p-4 h-96 overflow-y-auto mb-4 rounded"
        >
          {messages &&
            messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  message.role === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded ${
                    message.role === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white"
                  }`}
                >
                  {message.content[0].text.value}
                </span>
              </div>
            ))}
        </div>
        <form onSubmit={sendMessage} className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-grow p-2 border rounded-l"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r"
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
        <ThreadIdViewer></ThreadIdViewer>
      </div>
    </>
  );
}
