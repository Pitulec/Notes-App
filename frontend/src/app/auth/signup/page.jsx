"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";

import {AlertCircleIcon} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function SignUpPage() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const signup = () => {
        axios
            .post("http://localhost:3000/auth/signup", {
                username,
                password,
            })
            .then((res) => {
                router.push("/auth/login");
            })
            .catch((err) => {
                setError(err.status);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex flex-col bg-neutral-900 border-1 border-neutral-800 p-6 rounded-xl w-sm">
                {error && (
                    <Alert variant="destructive" className="mb-3">
                        <AlertCircleIcon/>
                        {error == 500 && (<>
                            <AlertTitle>Internal Server Error</AlertTitle>
                            <AlertDescription><p>Try again later</p></AlertDescription>
                        </>)}
                        {error == 422 && (<>
                            <AlertTitle>Let's try that again</AlertTitle>
                            <AlertDescription>
                                <p>To create your account, please make sure:</p>
                                <ul className="list-inside list-disc text-sm">
                                    <li>Your username has at least 3 characters</li>
                                    <li>Your password is at least 8 characters and includes a number</li>
                                </ul>
                            </AlertDescription>
                        </>)}
                        {error == 409 && (<>
                            <AlertTitle>Username already taken</AlertTitle>
                            <AlertDescription>
                                <p>This username is already in use. Please choose a different one.</p>
                            </AlertDescription>
                        </>)}
                    </Alert>
                )}
                <h1 className="text-md font-bold">Create your account</h1>
                <p className="text-sm text-neutral-400 ">Enter your username below to create your account</p>
                <Label htmlFor="username" className="mt-4 mb-2.5">Username</Label>
                <Input
                    id="username"
                    type="username"
                    placeholder="Type your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-neutral-800 border-neutral-600"
                />
                <Label htmlFor="password" className="mt-4 mb-2.5">Password</Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-neutral-800 border-neutral-600"
                />
                <Button onClick={signup} variant="secondary" className="mt-6">Signup</Button>
                <div className="mt-3 text-center text-sm">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="underline underline-offset-4">Log in</Link>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;
