"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

function RedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.push(
      localStorage.getItem("authToken") === null ? "/auth/login" : "/notes",
    );
  }, []);

  return <></>;
}

export default RedirectPage;
