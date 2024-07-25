"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

export interface QuizProps {
  questions: Question[];
}

export function Quiz({ questions }: QuizProps) {
  const [userResponses, setUserResponses] = useState<{ [key: string]: string }>(
    {}
  );
  const router = useRouter();

  const handleResponseChange = (questionIndex: number, value: string) => {
    setUserResponses({
      ...userResponses,
      [`question_${questionIndex + 1}`]: value,
    });
  };

  const handleSubmit = async () => {
    const correctAnswers = questions.reduce((acc, question, index) => {
      acc[`question_${index + 1}`] = question.correct_answer;
      return acc;
    }, {} as { [key: string]: string });

    const payload = {
      user_responses: userResponses,
      correct_answers: correctAnswers,
    };

    const response = await fetch("/api/test/submit-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log("Quiz submitted successfully");
      router.push("/test/results");
    } else {
      console.error("Failed to submit quiz");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-6">
        {questions.map((q, questionIndex) => (
          <div
            key={questionIndex}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="mb-4 text-lg font-semibold">{q.question}</h2>
            <RadioGroup
              onValueChange={(value) =>
                handleResponseChange(questionIndex, value)
              }
            >
              {q.options.map((option, optionIndex) => (
                <div key={optionIndex} className="flex items-center mb-2">
                  <RadioGroupItem
                    value={option}
                    id={`q${questionIndex}o${optionIndex}`}
                  />
                  <Label
                    htmlFor={`q${questionIndex}o${optionIndex}`}
                    className="ml-2"
                  >
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        ))}
        <Button className="w-full" onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
}
