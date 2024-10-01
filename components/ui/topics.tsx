"use client";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { useRouter } from "next/navigation";

type TopicsProps = {
  topics: string[]; // Topics is an array of strings
};

const Topics = ({ topics }: TopicsProps) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const router = useRouter();

  // Toggle topic selection based on the topic string
  const toggleTopic = (topic: string) => {
    setSelectedTopics((prevSelectedTopics) =>
      prevSelectedTopics.includes(topic)
        ? prevSelectedTopics.filter((selected) => selected !== topic)
        : [...prevSelectedTopics, topic]
    );
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const postSelectedTopics = async () => {
    const payload = {
      titles: selectedTopics, // Selected topics strings
      userInput: textInput, // User input from text field
    };

    try {
      const response = await fetch("/api/submitTopics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Successfully posted data:", payload);
      router.push("/revise"); // Navigate to another page after submission
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <section className="mb-8">
      <h2 className="mb-2 text-xl font-semibold">Topics to learn</h2>
      <p className="mb-4 text-gray-600">
        Select topics to learn from and provide additional input.
      </p>
      <div className="grid grid-cols-4 gap-4 mb-4">
        {topics.map((topic) => (
          <Button
            key={topic}
            onClick={() => toggleTopic(topic)}
            variant="default"
            selected={selectedTopics.includes(topic)}
          >
            {topic}
          </Button>
        ))}
      </div>
      <section className="mb-8">
        <Label htmlFor="prompt" className="block mb-2 text-sm font-medium">
          Explain what you want to learn about in more detail
        </Label>
        <Input
          id="prompt"
          placeholder="Value"
          value={textInput}
          onChange={handleInputChange}
          className="mb-4 p-2 border rounded"
        />
      </section>
      <Button onClick={postSelectedTopics} className="mx-auto">
        Submit Selected Topics
      </Button>
    </section>
  );
};

export default Topics;
