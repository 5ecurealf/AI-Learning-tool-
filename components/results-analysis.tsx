"use client";

import { useQuizAnalysis } from "@/contexts/TestAnalysisContext";

// Retrieves quiz analysis data from context and shows a loading state if unavailable.
// Displays the test score prominently with a congratulatory message.
// Provides a performance breakdown for each subject, including scores and feedback.
// Lists topics for revision, categorized by subject.
// Offers a clean and structured UI with sections for score, performance analysis, and topics to revise.

interface SubjectPerformance {
  subject: string;
  score: number;
}

interface SubjectAnalysis {
  subject: string;
  feedback: string;
}

interface SubjectTopics {
  subject: string;
  topics: string[];
}

interface ResultsData {
  testScore: number;
  performance: SubjectPerformance[];
  analysis: SubjectAnalysis[];
  topicsToRevise: SubjectTopics[];
}

export function ResultsAnalysis() {
  // Retrieve the data from the context instead of using fetch
  const { quizAnalysis } = useQuizAnalysis();

  // If no data is available yet, show a loading state
  if (!quizAnalysis) {
    return <div>Loading...</div>;
  }

  // Destructure the quiz analysis to ensure default values
  const {
    testScore,
    performance = [],
    analysis = [],
    topicsToRevise = [],
  } = quizAnalysis;

  return (
    <div className="bg-background text-foreground">
      <header className="py-12 px-4 md:px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your Test Results Analysis
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
          This page provides a detailed analysis of your test performance,
          highlighting your strengths and areas for improvement.
        </p>
      </header>
      <main className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6">
        {/* Test Score Section */}
        <section>
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Test Score</h2>
            <div className="mt-8 flex flex-col items-center">
              <div className="text-7xl font-bold text-primary">{testScore}</div>
              <span className="mt-2 text-4xl font-bold">%</span>
              <p className="mt-4 text-muted-foreground">
                Congratulations! You have achieved an excellent score on the
                test.
              </p>
            </div>
          </div>
        </section>

        {/* Performance Analysis Section */}
        <section>
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Performance Analysis</h2>
            <div className="mt-8 grid gap-6">
              {performance.length > 0 ? (
                performance.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold capitalize">
                      {item.subject}
                    </h3>
                    <div className="mt-2 flex items-center">
                      <div className="w-full bg-muted rounded-full h-4">
                        <div
                          className="bg-primary rounded-full h-4"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <span className="ml-4 text-muted-foreground">
                        {item.score}%
                      </span>
                    </div>
                    <p className="mt-2 text-muted-foreground">
                      {
                        analysis.find(
                          (analysisItem) =>
                            analysisItem.subject === item.subject
                        )?.feedback
                      }
                    </p>
                  </div>
                ))
              ) : (
                <p>No performance data available.</p>
              )}
            </div>
          </div>
        </section>

        {/* Topics to Revise Section */}
        <section>
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Topics to Revise</h2>
            <div className="mt-8 grid gap-4">
              {topicsToRevise.length > 0 ? (
                topicsToRevise.map((item, index) => (
                  <div key={index}>
                    <h3 className="text-lg font-semibold capitalize">
                      {item.subject}
                    </h3>
                    <ul className="list-disc pl-6 text-muted-foreground">
                      {item.topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <p>No topics to revise available.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
