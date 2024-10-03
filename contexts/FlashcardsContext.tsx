"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";

// Define the structure for Flashcards data
interface Flashcard {
  question: string;
  answer: string;
}

// Define the type for the context
interface FlashcardsContextType {
  flashcards: Flashcard[] | null;
  setFlashcards: (flashcards: Flashcard[] | null) => void;
}

// Create the context with default undefined
const FlashcardsContext = createContext<FlashcardsContextType | undefined>(
  undefined
);

// Define the Provider component's props
interface FlashcardsProviderProps {
  children: ReactNode;
}

// Create the Provider component
export const FlashcardsProvider: React.FC<FlashcardsProviderProps> = ({
  children,
}) => {
  const [flashcards, setFlashcards] = useState<Flashcard[] | null>(null);

  return (
    <FlashcardsContext.Provider value={{ flashcards, setFlashcards }}>
      {children}
    </FlashcardsContext.Provider>
  );
};

// Custom Hook to use the FlashcardsContext
export const useFlashcards = (): FlashcardsContextType => {
  const context = useContext(FlashcardsContext);
  if (!context) {
    throw new Error("useFlashcards must be used within a FlashcardsProvider");
  }
  return context;
};
