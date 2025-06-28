"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

function NotesPage() {
  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:3000/notes/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      if (res.status === 200) {
        setData(await res.json());
      }
    } catch {
      console.log("Error");
    }
  };

  useEffect(() => {
    document.title = "Notes App - dashboard";
    fetchData();
  }, []);

  return (
    <main className="min-h-scree max-w-4xl mx-auto px-6 py-16">
      {data && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {data.map((note, id) => (
            <Link
              href={`/notes/${id + 1}`}
              key={id}
              className="rounded-2xl p-6 flex flex-col gap-2 border border-neutral-800 bg-neutral-900 hover:scale-[1.02] transition-transform duration-200"
            >
              <h1 className="text-2xl font-bold mb-2 text-neutral-200">
                {note.title}
              </h1>
              <p className="text-neutral-400">{note.content}</p>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default NotesPage;
