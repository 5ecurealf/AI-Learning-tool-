// Define types for the returned data structure
"use client";

interface Performance {
  subject: string;
  score: number;
}

interface Analysis {
  subject: string;
  feedback: string;
}

interface TopicsToRevise {
  subject: string;
  topics: string[];
}

interface QuizAnalysisData {
  testScore: number;
  performance: Performance[];
  analysis: Analysis[];
  topicsToRevise: TopicsToRevise[];
}

// Define the context type for quiz analysis data
interface QuizAnalysisContextType {
  quizAnalysis: QuizAnalysisData | null; // Holds the returned data
  setQuizAnalysis: (data: QuizAnalysisData) => void; // Function to update the data
}

import { createContext, useContext, useState, ReactNode } from "react";

// Create the QuizAnalysisContext with a default value of undefined
export const QuizAnalysisContext = createContext<
  QuizAnalysisContextType | undefined
>(undefined);

// Create the Provider component
export const QuizAnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [quizAnalysis, setQuizAnalysis] = useState<QuizAnalysisData | null>(
    null
  );

  return (
    <QuizAnalysisContext.Provider value={{ quizAnalysis, setQuizAnalysis }}>
      {children}
    </QuizAnalysisContext.Provider>
  );
};

// Custom hook to use the QuizAnalysisContext
export const useQuizAnalysis = (): QuizAnalysisContextType => {
  const context = useContext(QuizAnalysisContext);
  if (!context) {
    throw new Error(
      "useQuizAnalysis must be used within a QuizAnalysisProvider"
    );
  }
  return context;
};
