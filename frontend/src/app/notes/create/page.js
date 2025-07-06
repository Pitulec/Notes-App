"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

function CreatePage() {
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const create = () => {
    axios
      .post(
        "http://localhost:3000/notes/",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      )
      .then((res) => {
        router.push("/notes/");
      })
      .catch((err) => {
        setError(err.status);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen max-w-screen p-4">
      <div className="flex flex-col items-center w-3xl gap-2">
        {error && (
          <p className="p-0.5 text-sm pl-2 rounded-lg w-full bg-red-500/15 border border-red-500/30">
            {error}
          </p>
        )}
        <Textarea
          name="text"
          placeholder="Insert title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="!text-2xl bg-neutral-900 border-neutral-600"
        />
        <Textarea
          name="text"
          placeholder="Type your content here"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          className="!text-md bg-neutral-900 border-neutral-600"
        />
        <Button variant="secondary" onClick={create} className="w-full">
          Create
        </Button>
      </div>
    </div>
  );
}

export default CreatePage;
