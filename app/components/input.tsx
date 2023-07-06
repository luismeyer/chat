"use client";

import { useState } from "react";
import { sendMessage } from "../api/send-message";
import { useUser } from "@clerk/nextjs";
import { username } from "../shared/username";

export function Input() {
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const { user } = useUser();

  const handleClick = async () => {
    if (!user || message.trim().length === 0) {
      return;
    }

    setLoading(true);

    await sendMessage(message, {
      username: username(user),
      id: user.id,
    });

    setMessage("");
    setLoading(false);
  };

  return (
    <div className="flex items-center fixed bottom-3 left-3 right-3 shadow-lg rounded-md py-1 px-2 bg-teal-300 text-white">
      <input
        disabled={loading}
        placeholder="type a message here..."
        className="text-lg w-full h-12 bg-teal-300 placeholder:text-white"
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
