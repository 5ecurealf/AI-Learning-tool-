"use client";

import { useState } from "react";

export function FlashCards() {
  const flashcards = [
    {
      question: "What is the capital of France?",
      answer: "Paris",
    },
    {
      question: "What is the largest ocean on Earth?",
      answer: "Pacific Ocean",
    },
    {
      question: 'Who wrote the novel "To Kill a Mockingbird"?',
      answer: "Harper Lee",
    },
    {
      question: "What is the chemical symbol for gold?",
      answer: "Au",
    },
    {
      question: "What is the largest planet in our solar system?",
      answer: "Jupiter",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
    setIsFlipped(false);
  };
  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length
    );
    setIsFlipped(false);
  };
  const handleFlip = () => {
    setIsFlipped((prevState) => !prevState);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background">
      <div className="max-w-md w-full">
        <div className="relative h-[400px] bg-card rounded-lg shadow-lg overflow-hidden">
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-transform duration-500 ${
              isFlipped ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              {flashcards[currentIndex].question}
            </h2>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={handleFlip}
            >
              Reveal Answer
            </button>
          </div>
          <div
            className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-transform duration-500 ${
              isFlipped ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <h2 className="text-2xl font-bold mb-4">
              {flashcards[currentIndex].answer}
            </h2>
            <button
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={handleFlip}
            >
              Flip Card
            </button>
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <button
            className="bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handlePrev}
            disabled={currentIndex === 0}
          >
            Previous
          </button>
          <div className="flex items-center">
            <div className="w-2 h-2 bg-muted rounded-full mr-2" />
            <div className="w-2 h-2 bg-muted rounded-full mr-2" />
            <div className="w-2 h-2 bg-primary rounded-full mr-2" />
            <div className="w-2 h-2 bg-muted rounded-full mr-2" />
            <div className="w-2 h-2 bg-muted rounded-full mr-2" />
          </div>
          <button
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
