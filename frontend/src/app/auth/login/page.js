"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {motion, AnimatePresence} from "motion/react";
import axios from "axios";
import Link from "next/link";

import {AlertCircle} from "lucide-react";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

function LoginPage() {
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const login = () => {
        axios
            .post("http://localhost:3000/auth/login", {
                username,
                password,
            })
            .then((res) => {
                router.push("/notes");
                localStorage.setItem("authToken", res.data.token);
            })
            .catch((err) => {
                setError(err.status);
            });
    };

    return (
        <div className="flex justify-center items-center h-screen w-screen">
            <div className="flex flex-col bg-neutral-900 border-1 border-neutral-800 p-6 rounded-xl w-sm">
                    {error && (
                            <Alert className="border-red-500/20 bg-red-950/15 text-red-100/80">
                                {error == 500 && (
                                    <>
                                        <AlertCircle className="!text-red-100"/>
                                        <AlertTitle className="text-red-100">
                                            Internal Server Error
                                        </AlertTitle>
                                        <AlertDescription className="text-red-200">
                                            <p>Try again later</p>
                                        </AlertDescription>
                                    </>
                                )}
                                {error == 422 && (
                                    <>
                                        <AlertCircle className="!text-red-100"/>
                                        <AlertTitle className="text-red-100">
                                            Let's try that again
                                        </AlertTitle>
                                        <AlertDescription className="text-red-200">
                                            <p>To create your account, please make sure:</p>
                                            <ul className="list-disc text-sm space-y-1 ml-4">
                                                <li>Your username has at least 3 characters</li>
                                                <li>
                                                    Your password is at least 8 characters and includes a
                                                    number
                                                </li>
                                            </ul>
                                        </AlertDescription>
                                    </>
                                )}
                                {error == 400 && (
                                    <>
                                        <AlertCircle className="!text-red-100"/>
                                        <AlertTitle className="text-red-100">
                                            Invalid credentials
                                        </AlertTitle>
                                    </>
                                )}
                            </Alert>
                    )}

                <h1 className="text-md font-bold">Login to your account</h1>
                <p className="text-sm text-neutral-400 ">
                    Enter your username below to login to your account
                </p>
                <Label htmlFor="username" className="mt-4 mb-2.5">
                    Username
                </Label>
                <Input
                    id="username"
                    type="username"
                    placeholder="Type your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-neutral-800 border-neutral-600"
                />
                <Label htmlFor="password" className="mt-4 mb-2.5">
                    Password
                </Label>
                <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-neutral-800 border-neutral-600"
                />
                <Button onClick={login} variant="secondary" className="mt-6">
                    Login
                </Button>
                <div className="mt-3 text-center text-sm">
                    Don't have an account?{" "}
                    <Link href="/auth/signup" className="underline underline-offset-4">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
