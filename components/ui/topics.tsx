"use client";
import { useState, useEffect } from "react";
import { Button } from "./button";

type Topic = {
  id: number;
  title: string;
};

const Topics = ({ fileUploaded }: { fileUploaded: boolean }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);

  useEffect(() => {
    if (fileUploaded) {
      fetch("/api/topics")
        .then((res) => res.json())
        .then((data) => {
          setTopics(data);
        })
        .catch((error) => {
          console.error("Error fetching topics:", error);
        });
    }
  }, [fileUploaded]);

  const toggleTopic = (id: number) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(id)
        ? prevSelectedTopics.filter((topicId) => topicId !== id)
        : [...prevSelectedTopics, id]
    );
  };

  useEffect(() => {
    console.log("Selected Topics:", selectedTopics);
    // Use selectedTopics elsewhere as needed
  }, [selectedTopics]);

  return (
    <section className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">Topics to learn</h2>
      <p className="mb-4 text-gray-600">
        Here are some suggested topics to learn from
      </p>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {topics.map((t) => (
          <Button
            key={t.id}
            onClick={() => toggleTopic(t.id)}
            variant="default"
            selected={selectedTopics.includes(t.id)}
          >
            {t.title}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Topics;
