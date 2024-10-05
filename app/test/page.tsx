"use client";
import { Quiz, Quiz_data } from "@/components/quiz";
import { useState, useEffect } from "react";
import ThreadIdViewer from "@/components/ThreadIdViewer";
import { useThread } from "@/contexts/ThreadContext";
import { useTopics } from "@/contexts/TopicsContext";

export default function Page() {
  const [quiz_data, setQuizdata] = useState<Quiz_data>();
  const { threadId } = useThread();
  const { topics } = useTopics();

  useEffect(() => {
    if (!threadId || !topics) {
      return;
    }
    const fetchQuiz = async () => {
      const payload = {
        threadId: threadId,
        topics: topics,
      };
      const response = await fetch("/api/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error("Network response was not ok");
      }

      console.log("Successfully posted data:", payload);

      if (!data.quiz) {
        throw new Error("No quiz data");
      }

      console.log("Successfully obtained data:", data.quiz);
      setQuizdata(data.quiz);
    };

    fetchQuiz();
  }, []);

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
      {quiz_data && <Quiz quiz={quiz_data}></Quiz>}
      <ThreadIdViewer></ThreadIdViewer>
    </>
  );
}
