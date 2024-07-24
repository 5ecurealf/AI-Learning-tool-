"use client";
import { useState, useEffect } from "react";
import { Button } from "./button";
import { Label } from "./label";
import { Input } from "./input";
import { useRouter } from "next/navigation";

type Topic = {
  id: number;
  title: string;
};

const Topics = ({ fileUploaded }: { fileUploaded: boolean }) => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<number[]>([]);
  const [textInput, setTextInput] = useState<string>("");
  const router = useRouter();

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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  const postSelectedTopics = async () => {
    const selectedTitles = selectedTopics
      .map((id) => {
        const topic = topics.find((t) => t.id === id);
        return topic ? topic.title : "";
      })
      .filter((title) => title !== "");

    const payload = {
      titles: selectedTitles,
      userInput: textInput,
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
      router.push("/revise");
    } catch (error) {
      console.error("Error posting data:", error);
    }
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
