"use client";

import { useMemo, useRef } from "react";

type MessageProps = {
  message: string;
  author: string;
  isOwnMessage: boolean;
  backgroundColor: string;
};

export function Message({
  author,
  message,
  isOwnMessage,
  backgroundColor,
}: MessageProps) {
  return (
    <div className={`w-full rounded-md shadow-md p-2 grid ${backgroundColor}`}>
      {!isOwnMessage && <span className="text-xs text-gray-500">{author}</span>}

      <span className="text-lg">{message}</span>
    </div>
  );
}
