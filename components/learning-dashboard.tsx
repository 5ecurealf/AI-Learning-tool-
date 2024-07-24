"use client";

import { useState } from "react";
import { UploadForm } from "./ui/uploadForm";
import Topics from "./ui/topics";

export function LearningDashboard() {
  const [fileUploaded, setFileUploaded] = useState(false);
  return (
    <div className="flex min-h-screen">
      {/* main page  */}
      <main className="flex-1 p-8">
        <h1 className="mb-4 text-3xl font-bold text-primary">Data Ingest</h1>
        <section className="mb-8">
          <h2 className="mb-2 text-xl font-semibold">Resources</h2>
          <div className="flex items-center justify-center p-8 border-2 border-dashed rounded-lg bg-blue-50">
            <UploadForm setState={setFileUploaded}></UploadForm>
          </div>
        </section>
        {fileUploaded && <Topics fileUploaded={fileUploaded} />}
      </main>
    </div>
  );
}
