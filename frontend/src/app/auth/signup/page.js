"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import axios from "axios";
import Link from "next/link";

import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
        setError(err.response.status);
      });
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="flex flex-col bg-neutral-900 border-1 border-neutral-800 p-6 rounded-xl w-sm">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              key="error-alert"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              className="mb-4"
            >
              <Alert className="border-red-500/20 bg-red-950/15 text-red-100/80">
                {error == 422 && (
                  <>
                    <AlertCircle className="!text-red-100" />
                    <AlertTitle className="text-red-100">
                      Let's try that again
                    </AlertTitle>
                    <AlertDescription className="text-red-200">
                      <p>To create your account, please make sure:</p>
                      <ul className="list-disc text-sm space-y-1 ml-4">
                        <li>Your username has at least 3 characters</li>
                        <li>
                          Your password is at least 8 characters and includes
                          a number
                        </li>
                      </ul>
                    </AlertDescription>
                  </>
                )}
                {error == 409 && (
                  <>
                    <AlertCircle className="!text-red-100" />
                    <AlertTitle className="text-red-100">
                      Username already taken
                    </AlertTitle>
                    <AlertDescription className="text-red-200">
                      <p>This username is already in use. Please choose a different one.</p>
                    </AlertDescription>
                  </>
                )}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <h1 className="text-md font-bold">Create your account</h1>
        <p className="text-sm text-neutral-400 ">
          Enter your username below to create your account
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
        <Button onClick={signup} variant="secondary" className="mt-6">
          Create your account
        </Button>
        <div className="mt-3 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline underline-offset-4">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;