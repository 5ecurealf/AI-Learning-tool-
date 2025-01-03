"use client";
import { Quiz, Quiz_data } from "@/components/quiz";
import { useState, useEffect } from "react";
import ThreadIdViewer from "@/components/ThreadIdViewer";
import { useThread } from "@/contexts/ThreadContext";
import { useTopics } from "@/contexts/TopicsContext";

// this component fetches the quiz data when the page loads
// if the quiz data is available, then render the Quiz component
// This functionality depends on the assistant function tools, and so there is a run that is waiting for the response,
// therefore the test needs to be completed before the run expires (10 minutes)
// if the user navigates away from page the quiz is lost, so the navigation to other pages needs to be disabled

export default function Page() {
  const [quiz_data, setQuizdata] = useState<Quiz_data>();
  const { threadId } = useThread();
  const [runId, setRunId] = useState<string>();
  const [toolCallId, setToolCallId] = useState<string>();
  const { topics } = useTopics();
  const [isLoading, setIsLoading] = useState(false); // Add loading state

  useEffect(() => {
    // Only make the request if threadId and topics are valid and not already loading
    if (!threadId || !topics || isLoading) {
      return;
    }

    const fetchQuiz = async () => {
      setIsLoading(true); // Set loading to true before making the request
      try {
        const payload = { threadId, topics };
        console.log(
          `[CLIENT] Fetching quiz data for threadId: ${threadId}, topics: ${topics}`
        );
        const response = await fetch("/api/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(
            `[CLIENT] Network response was not ok, status: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data.quiz) {
          console.error(
            `[CLIENT] No quiz data received for threadId: ${threadId}`
          );
          throw new Error("No quiz data");
        }

        console.log(`[CLIENT] Successfully obtained quiz data:`, data.quiz);
        setQuizdata(data.quiz);
        setRunId(data.runId);
        setToolCallId(data.tool_call_id);
      } catch (error) {
        console.error(`[CLIENT] Error fetching quiz:`, error);
      } finally {
        setIsLoading(false); // Set loading to false after the request is done
      }
    };

    fetchQuiz();
  }, [threadId, topics]);

  return (
    <>
      <p
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: "rgb(238, 195, 232)",
        }}
      >
        Test Page
      </p>
      {quiz_data && (
        <Quiz quiz={quiz_data} runId={runId} toolCallId={toolCallId}></Quiz>
      )}
      <ThreadIdViewer></ThreadIdViewer>
    </>
  );
}
