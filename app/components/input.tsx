"use client";

import { startTransition, useEffect, useState } from "react";
import { sendMessage } from "../api/send-message";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export function Input() {
  const router = useRouter();

  const [message, setMessage] = useState("");

  const { user } = useUser();

  const handleClick = async () => {
    if (!user) {
      return null;
    }

    const { username, firstName, lastName } = user;

    const customUsername =
      firstName && lastName
        ? firstName?.slice(0, 3) + lastName?.slice(0, 3)
        : undefined;

    const name =
      username ?? customUsername ?? firstName ?? lastName ?? "unkown user";

    await sendMessage(message, name);

    setMessage("");
  };

  useEffect(() => {
    const interval = setInterval(() => {
      startTransition(() => router.refresh());
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="flex items-center fixed bottom-2 left-2 right-2 shadow-lg rounded-md p-1 bg-white">
      <input
        className="text-lg w-full p-2"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleClick();
          }
        }}
      />

      <button className="p-4" onClick={handleClick}>
        Send
      </button>
    </div>
  );
}
