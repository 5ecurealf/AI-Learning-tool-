"use client";
import { Quiz, Question } from "@/components/quiz";
import { useState, useEffect } from "react";
import ThreadIdViewer from "@/components/ThreadIdViewer";
export default function Page() {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/test");
      const data: Question[] = await response.json();
      setQuestions(data);
    };

    fetchQuestions();
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
      <Quiz questions={questions}></Quiz>
      <ThreadIdViewer></ThreadIdViewer>
    </>
  );
}
