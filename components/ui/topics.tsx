"use client";
import { useState, useEffect } from "react";
import { Button } from "./button";

type Topic = {
  id: number;
  title: string;
};

const Topics = ({ fileUploaded }: { fileUploaded: boolean }) => {
  const [topics, setTopics] = useState<Topic[] | null>(null);

  useEffect(() => {
    if (fileUploaded) {
      fetch("/api/topics")
        .then((res) => res.json())
        .then((data) => {
          setTopics(data);
          console.log("Response of calling Topics API", data);
        })
        .catch((error) => {
          console.error("Error fetching topics:", error);
        });
    }
  }, [fileUploaded]);

  return (
    topics && (
      <section className="mb-8">
        <h2 className="mb-2 text-xl font-semibold">Topics to learn</h2>
        <p className="mb-4 text-gray-600">
          Here are some suggested topics to learn from
        </p>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {topics.map((t) => (
            <Button
              key={t.id}
              // onClick={() => handleTopicClick(topic.id)}
              variant="default"
            >
              {t.title}
            </Button>
          ))}
        </div>
      </section>
    )
  );
};

export default Topics;
