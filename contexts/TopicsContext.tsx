"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Define the context type for an array of strings
interface TopicContextType {
  topics: string[];
  setTopics: (topics: string[]) => void;
}

// Create the context with default value as undefined
export const TopicContext = createContext<TopicContextType | undefined>(
  undefined
);

// Create the Provider component
export const TopicsProvider = ({ children }: { children: ReactNode }) => {
  const [topics, setTopics] = useState<string[]>([]);

  return (
    <TopicContext.Provider value={{ topics, setTopics }}>
      {children}
    </TopicContext.Provider>
  );
};

// Custom hook to use the TopicContext
export const useTopics = (): TopicContextType => {
  const context = useContext(TopicContext);
  if (!context) {
    throw new Error("useTopics must be used within a TopicsProvider");
  }
  return context;
};
