"use client";
import { Quiz, Quiz_data } from "@/components/quiz";
import { useState, useEffect } from "react";
import ThreadIdViewer from "@/components/ThreadIdViewer";

export default function Page() {
  const [quiz_data, setQuizdata] = useState<Quiz_data>();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch("/api/test");
      const data: Quiz_data = await response.json();
      setQuizdata(data);
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
      {quiz_data && <Quiz quiz={quiz_data}></Quiz>}
      <ThreadIdViewer></ThreadIdViewer>
    </>
  );
}
