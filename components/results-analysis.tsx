"use client";

export function ResultsAnalysis() {
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
        <section>
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Test Score</h2>
            <div className="mt-8 flex flex-col items-center">
              <div className="text-7xl font-bold text-primary">92</div>
              <span className="mt-2 text-4xl font-bold">%</span>
              <p className="mt-4 text-muted-foreground">
                Congratulations! You have achieved an excellent score on the
                test.
              </p>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Performance Analysis</h2>
            <div className="mt-8 grid gap-6">
              <div>
                <h3 className="text-lg font-semibold">Mathematics</h3>
                <div className="mt-2 flex items-center">
                  <div className="w-full bg-muted rounded-full h-4">
                    <div
                      className="bg-primary rounded-full h-4"
                      style={{ width: "85%" }}
                    />
                  </div>
                  <span className="ml-4 text-muted-foreground">85%</span>
                </div>
                <p className="mt-2 text-muted-foreground">
                  You performed exceptionally well in the mathematics section,
                  demonstrating a strong grasp of the concepts. However, you
                  could improve your problem-solving skills by practicing more
                  complex word problems.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">English</h3>
                <div className="mt-2 flex items-center">
                  <div className="w-full bg-muted rounded-full h-4">
                    <div
                      className="bg-primary rounded-full h-4"
                      style={{ width: "75%" }}
                    />
                  </div>
                  <span className="ml-4 text-muted-foreground">75%</span>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Your performance in the English section was good, but you
                  could improve your reading comprehension and writing skills.
                  Consider focusing on practice exercises that target these
                  areas.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Science</h3>
                <div className="mt-2 flex items-center">
                  <div className="w-full bg-muted rounded-full h-4">
                    <div
                      className="bg-primary rounded-full h-4"
                      style={{ width: "65%" }}
                    />
                  </div>
                  <span className="ml-4 text-muted-foreground">65%</span>
                </div>
                <p className="mt-2 text-muted-foreground">
                  Your science performance was relatively weaker compared to
                  other subjects. You should focus on strengthening your
                  understanding of scientific concepts and improving your
                  problem-solving skills in this area.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="bg-card rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold">Topics to Revise</h2>
            <div className="mt-8 grid gap-4">
              <div>
                <h3 className="text-lg font-semibold">Mathematics</h3>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Complex word problems</li>
                  <li>Algebra concepts</li>
                  <li>Geometry formulas</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">English</h3>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Reading comprehension strategies</li>
                  <li>Essay writing structure</li>
                  <li>Grammar and punctuation rules</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Science</h3>
                <ul className="list-disc pl-6 text-muted-foreground">
                  <li>Scientific method and hypothesis testing</li>
                  <li>Principles of physics</li>
                  <li>Biological processes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
