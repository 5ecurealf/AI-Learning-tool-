"use client";
import { Quiz, Quiz_data } from "@/components/quiz";
import { useState, useEffect } from "react";
import ThreadIdViewer from "@/components/ThreadIdViewer";
import { useThread } from "@/contexts/ThreadContext";
import { useTopics } from "@/contexts/TopicsContext";

const quiz_mock_data: Quiz_data = {
  title: "Shakespeare's Sonnets: Exploring Key Themes",
  questions: [
    {
      question_text:
        "How does Shakespeare use imagery in nature to depict love and beauty in his sonnets?",
      question_type: "FREE_RESPONSE",
      choices: [],
    },
    {
      question_text:
        "Which metaphor is frequently used by Shakespeare to illustrate the transience of time?",
      question_type: "MULTIPLE_CHOICE",
      choices: [
        "A. The setting sun",
        "B. A passing river",
        "C. A summer's day",
        "D. Autumn leaves",
      ],
    },
    {
      question_text: "What is the structure of a Shakespearean sonnet?",
      question_type: "MULTIPLE_CHOICE",
      choices: [
        "A. Twelve lines with one couplet",
        "B. 14 lines: three quatrains and a couplet",
        "C. 16 lines with one quatrain",
        "D. 12 lines in three tercets",
      ],
    },
    {
      question_text:
        "In what ways do the sonnets explore Shakespeare's own self-reflection? Provide specific examples if possible.",
      question_type: "FREE_RESPONSE",
      choices: [],
    },
    {
      question_text:
        "What role does nature imagery play in discussing the theme of mortality in the sonnets?",
      question_type: "MULTIPLE_CHOICE",
      choices: [
        "A. To illustrate the cyclical nature of life",
        "B. To detract from the poem's main theme",
        "C. As mere decoration",
        "D. To focus on life's permanence",
      ],
    },
    {
      question_text:
        "Discuss an example of how complex relationships are depicted in Shakespeare's sonnets.",
      question_type: "FREE_RESPONSE",
      choices: [],
    },
    {
      question_text:
        "Which emotion is primarily explored throughout many of Shakespeare's sonnets?",
      question_type: "MULTIPLE_CHOICE",
      choices: ["A. Anger", "B. Love", "C. Sadness", "D. Jealousy"],
    },
    {
      question_text:
        "How does Shakespeare address identity and legacy in his sonnets?",
      question_type: "FREE_RESPONSE",
      choices: [],
    },
    {
      question_text:
        "Which theme often contrasts personal desires with wider societal duties in the sonnets?",
      question_type: "MULTIPLE_CHOICE",
      choices: [
        "A. Love vs. Duty",
        "B. Wealth vs. Poverty",
        "C. Honor vs. Shame",
        "D. Ambition vs. Contentment",
      ],
    },
    {
      question_text:
        "How does Shakespeare use poetic form to enhance the themes explored in his sonnets?",
      question_type: "FREE_RESPONSE",
      choices: [],
    },
  ],
};

export default function Page() {
  const [quiz_data, setQuizdata] = useState<Quiz_data>();
  const { threadId } = useThread();
  const [runId, setRunId] = useState<string>();
  const [toolCallId, setToolCallId] = useState<string>();
  const { topics } = useTopics();

  useEffect(() => {
    if (!threadId || !topics || !Array.isArray(topics)) return; // Ensure threadId and topics are valid

    const fetchQuiz = async () => {
      setIsLoading(true); // Set loading to true before making the request
      try {
        const payload = { threadId, topics };
        console.log(
          `[CLIENT] Fetching quiz data for threadId: ${threadId}, topics: ${topics}`
        );
        const response = await fetch("/api/test", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(
            `[CLIENT] Network response was not ok, status: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data.quiz) {
          console.error(
            `[CLIENT] No quiz data received for threadId: ${threadId}`
          );
          throw new Error("No quiz data");
        }

        console.log(`[CLIENT] Successfully obtained quiz data:`, data.quiz);
        setQuizdata(data.quiz);
        setRunId(data.runId);
        setToolCallId(data.tool_call_id);
      } catch (error) {
        console.error(`[CLIENT] Error fetching quiz:`, error);
      } finally {
        setIsLoading(false); // Set loading to false after the request is done
      }
    };

    fetchQuiz();
  }, [threadId, topics]);

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
      {quiz_data && (
        <Quiz quiz={quiz_data} runId={runId} toolCallId={toolCallId}></Quiz>
      )}
      <ThreadIdViewer></ThreadIdViewer>
    </>
  );
}
