"use client";

import { useState } from "react";
import { sendMessage } from "../api/send-message";
import { useUser } from "@clerk/nextjs";

export function Input() {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const { user } = useUser();

  const handleClick = async () => {
    if (!user) {
      return null;
    }

    setLoading(true);

    const { username, firstName, lastName } = user;

    const customUsername =
      firstName && lastName
        ? firstName?.slice(0, 3) + lastName?.slice(0, 3)
        : undefined;

    const name =
      username ?? customUsername ?? firstName ?? lastName ?? "unkown user";

    await sendMessage(message, name);

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="flex items-center fixed bottom-2 left-2 right-2 shadow-lg rounded-md p-1 bg-white">
      <input
        disabled={loading}
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

      <button disabled={loading} className="p-4" onClick={handleClick}>
        Send
      </button>
    </div>
  );
}
