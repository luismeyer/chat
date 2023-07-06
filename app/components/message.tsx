"use client";

import { formatDistanceToNow } from "date-fns";

type MessageProps = {
  message: string;
  date: Date;
  author: string;
};

export function Message({ author, date, message }: MessageProps) {
  return (
    <div className="w-full rounded-md shadow-md p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">{author}</span>

        <span className="text-sm text-gray-600">
          {formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })}
        </span>
      </div>

      <span className="text-lg">{message}</span>
    </div>
  );
}
