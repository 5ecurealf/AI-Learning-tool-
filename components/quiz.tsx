"use client";

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
  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="space-y-6">
        {questions.map((q, questionIndex) => (
          <div
            key={questionIndex}
            className="p-4 bg-white rounded-lg shadow-md"
          >
            <h2 className="mb-4 text-lg font-semibold">{q.question}</h2>
            <RadioGroup>
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
        <Button className="w-full">Submit</Button>
      </div>
    </div>
  );
}