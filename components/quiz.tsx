"use client";

import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useThread } from "@/contexts/ThreadContext";
import { tool } from "ai";

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

  // Handle responses for both free-response and multiple-choice questions
  const handleResponseChange = (questionIndex: number, value: string) => {
    const updatedResponses = [...userResponses];
    updatedResponses[questionIndex] = value; // Update the response for the correct question index
    setUserResponses(updatedResponses); // Update the state with the new responses array
  };

  const handleSubmit = async () => {
    console.log("User Responses (array of strings):", userResponses);
    const payload = {
      runId: runId,
      threadId: threadId,
      toolCallId: toolCallId,
      userResponses: userResponses,
    };
    // Submit the array of responses to the backend
    const response = await fetch("/api/test/submit-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload), // Now sending the array directly
    });

    if (response.ok) {
      console.log("Quiz submitted successfully");
    } else {
      console.error("Failed to submit quiz");
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
