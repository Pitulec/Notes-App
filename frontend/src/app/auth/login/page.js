"use client";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const login = () => {
    axios.post("http://localhost:3000/auth/login", {
      username,
      password,
    })
    .then((res) => {
      router.push("/notes");
      localStorage.setItem("authToken", res.data.token);
    })
    .catch((err) => {
      setError(err.response.data.message);
    })
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col bg-neutral-800 border-2 border-neutral-900 p-4 rounded-xl max-w-xs">
        <h1 className="font-bold text-2xl pb-1">Login</h1>
        {error && (
          <p className="p-0.5 text-sm pl-2 rounded-lg w-full bg-red-500/30 border border-red-500/20">
            {error}
          </p>
        )}
        <label className="text-sm">Username</label>
        <input
          type="text"
          name="username"
          placeholder="John"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="outline-none border border-neutral-900 bg-neutral-900 rounded-md w-full p-1 text-md mb-2"
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="P@ssw0rd"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="outline-none border border-neutral-900 bg-neutral-900 rounded-md w-full p-1 text-md mb-2"
        />
        <button
          onClick={login}
          className="text-center w-full bg-neutral-50 text-neutral-950 rounded-md font-bold hover:bg-green-400 hover:text-neutral-50 duration-150 "
        >
          Login
        </button>
        <p className="text-neutral-300">
          Don't have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
