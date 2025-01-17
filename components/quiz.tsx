"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useThread } from "@/contexts/ThreadContext";
import { useRouter } from "next/navigation";
import { useQuizAnalysis } from "@/contexts/TestAnalysisContext";

// Displays a quiz title and a series of questions, supporting multiple-choice and free-response formats.
// Tracks user responses using state, updating them dynamically as users input answers.
// Submits the quiz data, including responses and metadata (runId, threadId, toolCallId), to a backend endpoint.
// On successful submission, updates quiz analysis context and navigates to the results page.

interface Question {
  question_text: string;
  question_type: "FREE_RESPONSE" | "MULTIPLE_CHOICE";
  choices: string[];
}

export interface Quiz_data {
  title: string;
  questions: Question[];
}

interface QuizProps {
  quiz: Quiz_data;
  runId: string | undefined;
  toolCallId: string | undefined;
}

export const Quiz: React.FC<QuizProps> = ({ quiz, runId, toolCallId }) => {
  // Initialize an array of responses that matches the number of questions
  const [userResponses, setUserResponses] = useState<string[]>(
    Array(quiz.questions.length).fill("") // Ensure we start with an empty string for each question
  );
  const { threadId } = useThread();
  const router = useRouter();
  const { setQuizAnalysis } = useQuizAnalysis();

  // Handle responses for both free-response and multiple-choice questions
  const handleResponseChange = (questionIndex: number, value: string) => {
    console.log(
      `[CLIENT] Updating response for question ${questionIndex} with value: ${value}`
    );
    const updatedResponses = [...userResponses];
    updatedResponses[questionIndex] = value; // Update the response for the correct question index
    setUserResponses(updatedResponses); // Update the state with the new responses array
  };

  const handleSubmit = async () => {
    console.log("[CLIENT] Submitting quiz with the following data:", {
      runId,
      threadId,
      toolCallId,
      userResponses,
    });

    const payload = {
      runId: runId,
      threadId: threadId,
      toolCallId: toolCallId,
      userResponses: userResponses,
    };

    try {
      const response = await fetch("/api/test/submit-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload), // Now sending the array directly
      });

      if (response.ok) {
        console.log("[CLIENT] Quiz submitted successfully");
        const responseData = await response.json();
        console.log("[CLIENT] Server response data:", responseData);
        setQuizAnalysis(responseData.quiz_analysis);
        router.push("/test/results"); // Navigate to another page after submission
      } else {
        console.error(
          "[CLIENT] Failed to submit quiz. Status:",
          response.status
        );
        const errorData = await response.json();
        console.error("[CLIENT] Error details from server:", errorData);
      }
    } catch (error) {
      console.error("[CLIENT] Error occurred during quiz submission:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">{quiz.title}</h1>
      <div className="space-y-6">
        {quiz.questions.map((question, questionIndex) => (
          <div
            key={questionIndex}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="mb-4 text-lg font-semibold">
              {question.question_text}
            </h2>

            {question.question_type === "MULTIPLE_CHOICE" ? (
              <RadioGroup
                onValueChange={(value) =>
                  handleResponseChange(questionIndex, value)
                }
              >
                {question.choices.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex items-center mb-2">
                    <RadioGroupItem
                      value={choice}
                      id={`q${questionIndex}o${choiceIndex}`}
                    />
                    <Label
                      htmlFor={`q${questionIndex}o${choiceIndex}`}
                      className="ml-2"
                    >
                      {choice}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <textarea
                name={`question_${questionIndex}`}
                id={`question_${questionIndex}`}
                rows={4}
                className="w-full p-2 border rounded"
                placeholder="Type your answer here"
                onChange={(e) =>
                  handleResponseChange(questionIndex, e.target.value)
                }
              />
            )}
          </div>
        ))}

        <Button className="w-full mt-4" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Quiz;
