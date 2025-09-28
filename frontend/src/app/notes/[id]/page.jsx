"use client"
import {useState, useEffect} from "react"
import {useParams} from "next/navigation"
import axios from "axios"
import {useRouter} from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import {Trash2, Pencil, Save, X} from "lucide-react"

function NotePage() {
    const {id} = useParams()
    const [data, setData] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState("")
    const [editContent, setEditContent] = useState("")
    const router = useRouter()

    const fetchData = () => {
        axios
            .get(`http://localhost:3000/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then((res) => {
                setData(res.data)
                const note = res.data?.[0]
                if (note) {
                    setEditTitle(note.title)
                    setEditContent(note.content)
                }
            })
            .catch(() => {
                router.push("/notes")
            })
    }

    const deleteNote = () => {
        axios
            .delete(`http://localhost:3000/notes/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            })
            .then(() => {
                router.push("/notes")
            })
    }

    const editNote = () => {
        axios
            .put(
                `http://localhost:3000/notes/${id}`,
                {
                    title: editTitle,
                    content: editContent,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                    },
                },
            )
            .then(() => {
                setIsEditing(false)
                fetchData() // Refresh the note data
            })
            .catch((error) => {
                console.error("Error updating note:", error)
            })
    }

    const cancelEdit = () => {
        const note = data?.[0]
        if (note) {
            setEditTitle(note.title)
            setEditContent(note.content)
        }
        setIsEditing(false)
    }

    const note = data?.[0]

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (note) document.title = note.title
    }, [note])

    const formatDate = (dateString) => {
        if (!dateString) return ""
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {})
    }

    const createdAt = formatDate(note?.created_at)

    return (
        <main className="min-h-screen max-w-4xl mx-auto px-6 py-16">
            {note && (
                <article className="space-y-8">
                    <header className="flex justify-between border-b border-neutral-900 pb-8">
                        <div className="flex-1">
                            {isEditing ? (
                                <input
                                    type="text"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className="text-3xl font-bold bg-transparent border-b border-neutral-700 focus:border-neutral-500 outline-none w-full mb-2"
                                />
                            ) : (
                                <h1>{note.title}</h1>
                            )}
                            <p className="text-neutral-400 text-sm">Created: {createdAt}</p>
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
                            <Trash2 onClick={deleteNote} className="cursor-pointer hover:text-red-500"/>
                            {isEditing ? (
                                <>
                                    <Save onClick={editNote} className="cursor-pointer hover:text-green-500"/>
                                    <X onClick={cancelEdit} className="cursor-pointer hover:text-red-500"/>
                                </>
                            ) : (
                                <Pencil onClick={() => setIsEditing(true)}
                                        className="cursor-pointer hover:text-blue-500"/>
                            )}
                        </div>
                    </header>
                    {isEditing ? (
                        <textarea
                            value={editContent}
                            onChange={(e) => setEditContent(e.target.value)}
                            className="w-full h-96 bg-transparent border border-neutral-700 rounded-lg p-4 focus:border-neutral-500 outline-none resize-vertical"
                            placeholder="Write your note content here..."
                        />
                    ) : (
                        <ReactMarkdown>{note.content}</ReactMarkdown>
                    )}
                </article>
            )}
        </main>
    )
}

export default NotePage
