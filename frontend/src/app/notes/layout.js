"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function NotesLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("authToken") == null) {
      router.push("/auth/login");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  return isLoading ? <></> : <>{children}</>;
}

export default NotesLayout;
