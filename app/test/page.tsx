"use client";
import { Quiz, Question } from "@/components/quiz";
import { useState, useEffect } from "react";

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
      <p>Test Page</p>
      <Quiz questions={questions}></Quiz>
    </>
  );
}
