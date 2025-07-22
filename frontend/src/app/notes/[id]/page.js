"use client";
import {useState, useEffect} from "react";
import {useParams} from "next/navigation";
import axios from "axios";
import {useRouter} from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import {Trash2, Pencil} from "lucide-react";

function NotePage() {
    const {id} = useParams();
    const [data, setData] = useState(null);
    const router = useRouter();

    const fetchData = () => {
        axios
            .get(`http://localhost:3000/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((res) => {
                setData(res.data);
            })
            .catch(() => {
                router.push("/notes");
            });
    };

    const deleteNote = () => {
        axios
            .delete(`http://localhost:3000/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(() => {
                router.push("/notes");
            })
    };

    const note = data?.[0];

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (note) {
            document.title = note.title;
        }
    }, [note]);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleString("pl-PL", {
            hour: "2-digit",
            minute: "2-digit",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour12: false,
        });
    };

    const createdAt = formatDate(note?.created_at);
    const updatedAt = formatDate(note?.updated_at);

    return (
        <>
        <main className="min-h-screen max-w-4xl mx-auto px-6 py-16">
            {note && (
                <article className="space-y-8">
                    <header className="flex justify-between border-b border-neutral-900 pb-8">
                        <div>

                                <p className="text-neutral-400 text-sm">Created: {createdAt}</p>
                                {updatedAt && (
                                    <p className="text-neutral-500 text-sm">Updated: {updatedAt}</p>
                                )}
                            </div>
                                <div className="flex items-center space-x-4 text-neutral-700">
                                <Link href="/notes">
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
                                <path d="m15 18-6-6 6-6"/>
                                </svg>
                                </Link>
                                <Trash2 onClick={deleteNote}/>
                        <Pencil/>
                    </div>
                </header>
                <ReactMarkdown>
            {note.content}
        </ReactMarkdown>
        </article>
)}
</main>
</>
)
    ;
}

export default NotePage;
