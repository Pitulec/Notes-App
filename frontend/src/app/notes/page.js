"use client";
import {useState, useEffect} from "react";
import axios from "axios";
import Link from "next/link";

function NotesPage() {
    const [data, setData] = useState(null);

    const fetchData = () => {
        axios
            .get("http://localhost:3000/notes/", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((res) => {
                if (res.status === 200) {
                    setData(res.data);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {});
    };

    const note = data?.[0];
    const createdAt = formatDate(note?.created_at);

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <main className="flex flex-col items-center min-h-screen w-screen">
            {data && (<>
                <div className="flex justify-between items-center max-w-5xl">
                    <div className="flex items-center gap-3">
                        <img src="avatar.jpg" className="w-8 rounded-full" />
                        <p className="text-neutral-50 text-xl">Hello, {}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl">
                    {data.map((note, id) => (
                        <Link
                            href={`/notes/${note.id}`} key={id}
                            className="flex flex-col gap-3 p-5 rounded-xl w-sm bg-neutral-900 border-1 border-neutral-800"
                        >
                            <h1 className="text-xl font-bold text-neutral-50">
                                {note.title.length > 50
                                    ? note.title.slice(0, 50) + "..."
                                    : note.title}
                            </h1>
                            <p className="text-sm text-neutral-400">
                                {note.content.length > 60
                                    ? note.content.slice(0, 90) + "..."
                                    : note.content}
                            </p>
                            <span className="text-sm text-neutral-500">
                                {createdAt}
                            </span>
                        </Link>
                    ))}
                </div>
            </>)}
        </main>
    );
}

export default NotesPage;
