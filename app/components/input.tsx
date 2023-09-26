"use client";

import { useEffect, useRef, useState } from "react";
import { sendMessage } from "../api/send-message";
import { useUser } from "@clerk/nextjs";

export function Input() {
  const inputRef = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);

  const { user } = useUser();

  const handleSubmit = async () => {
    if (!user || !inputRef.current?.value.trim()) {
      return;
    }

    setLoading(true);

    await sendMessage(inputRef.current?.value.trim());

    setLoading(false);
    inputRef.current.value = "";
  };

  useEffect(() => {
    if (loading || !inputRef.current) {
      return;
    }

    inputRef.current.focus();

    const controller = new AbortController();

    document.addEventListener(
      "keydown",
      () => {
        inputRef.current?.focus();
      },
      { signal: controller.signal }
    );

    return () => {
      controller.abort();
    };
  }, [loading]);

  return (
    <div className="flex items-center fixed bottom-3 left-3 right-3 shadow-lg rounded-md py-1 px-2 bg-teal-300 text-white">
      <input
        autoFocus
        ref={inputRef}
        disabled={loading}
        className="text-lg w-full h-12 bg-teal-300 placeholder:text-white"
        type="text"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />

      <button disabled={loading} className="p-4" onClick={handleSubmit}>
        Send
      </button>
    </div>
  );
}
