"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

function RegisterPage() {
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = () => {
    axios
      .post("http://localhost:3000/auth/signup", {
        username,
        password,
      })
      .then((res) => {
        router.push("/auth/login");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="flex flex-col bg-neutral-800 border-2 border-neutral-900 p-4 rounded-xl max-w-xs">
        <div>
          <h1 className="font-bold text-2xl pb-1">Sign up</h1>
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
            onClick={register}
            className="text-center w-full bg-neutral-50 text-neutral-950 rounded-md font-bold hover:bg-green-400 hover:text-neutral-50 duration-150 cursor-pointer"
          >
            Sign up
          </button>
        </div>
        <p className="text-neutral-300">
          You already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
