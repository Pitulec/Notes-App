"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Link from "next/link";

function NotePage() {
  const { id } = useParams();
  const [data, setData] = useState(null);

  const fetchData = () => {
    axios
      .get("http://localhost:3000/notes/${id}", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const note = data?.[0];

  useEffect(() => {
    if (note) {
      document.title = note.title;
    }
    fetchData();
  }, []);

  return (
    <>
      <main className="min-h-screen max-w-4xl mx-auto px-6 py-16">
        {note && (
          <article className="space-y-8">
            <header className="flex justify-between border-b border-neutral-900 pb-8">
              <h1 className="text-4xl font-bold text-neutral-100 mb-2">
                {note.title}
              </h1>
              <Link href="/notes" className="text-neutral-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </Link>
            </header>
            <div className="text-neutral-200 leading-relaxed whitespace-pre-wrap text-lg">
              {note.content}
            </div>
          </article>
        )}
      </main>
    </>
  );
}

export default NotePage;
