"use client";

import { formatDistanceToNow } from "date-fns";
import { deleteMessage } from "../api/delete-messages";

type MessageProps = {
  message: string;
  date: Date;
  author: string;
  id: number;
};

export function Message({ author, date, message, id }: MessageProps) {
  const handleClick = () => {
    deleteMessage(id);
  };

  return (
    <div onClick={handleClick} className="w-full rounded-md shadow-md p-5">
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
