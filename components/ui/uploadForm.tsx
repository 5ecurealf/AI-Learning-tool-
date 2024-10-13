"use client";
import { useState } from "react";
import { Button } from "./button";
import { useTopics } from "@/contexts/TopicsContext";
import { useFileId } from "@/contexts/FileIdContext";

type Props = {
  threadId: string | null;
};

export function UploadForm({ threadId }: Props) {
  const [file, setFile] = useState<File | null>();
  const [message, setMessage] = useState("");
  const { setTopics } = useTopics();
  const { setFileId } = useFileId();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    if (!threadId) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("purpose", "assistants");
    formData.append("threadId", threadId);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success)
        setMessage(`File uploaded and added to the conversation.`);
      console.log(data.topics.topics);
      setFile(null);

      if (data.fileId) {
        setFileId(data.fileId);
        console.log(`[CLIENT] obtained and set fileId : ${data.fileId}`);
      }

      if (data.topics.topics && Array.isArray(data.topics.topics)) {
        // Assuming `result.topics` is an array of strings from the server response
        setTopics(data.topics.topics); // Pass topics to parent
      }
    } catch (e: any) {
      console.error("Error uploading file:", e);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <Button type="submit" value="Upload">
          Upload
        </Button>
      </form>
      {message && <p className="text-sm text-gray-600">{message}</p>}
    </>
  );
}
