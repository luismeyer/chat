"use client";

import {
  MESSAGES_CHANNEL,
  Message,
  MessageSchema,
  NEW_MESSAGE_EVENT,
} from "../shared/message";
import { useCallback, useEffect, useRef, useState } from "react";
import { Message as MessageComponent } from "./message";
import { pusherClient } from "../shared/pusher-client";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@clerk/nextjs";

const COLORS = new Set([
  "bg-blue-100",
  "bg-green-100",
  "bg-white",
  "bg-emerald-100",
  "bg-red-100",
  "bg-yellow-100",
  "bg-orange-100",
]);

export function MessageList() {
  const availableColors = useRef(COLORS);
  const colors = useRef<Map<string, string>>(new Map());

  const bgColor = useCallback((id: string) => {
    if (colors.current.has(id)) {
      return colors.current.get(id)!;
    }

    const availableColorsArray = Array.from(availableColors.current);
    const color =
      availableColorsArray[
        Math.floor(Math.random() * availableColorsArray.length)
      ];

    availableColors.current.delete(color);

    console.log(Array.from(availableColors.current));

    colors.current.set(id, color);

    return color;
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);

  const currentUser = useUser();

  useEffect(() => {
    const channel = pusherClient.subscribe(MESSAGES_CHANNEL);

    channel.bind(NEW_MESSAGE_EVENT, function (data: unknown) {
      const message = MessageSchema.parse(data);

      setMessages((pre) => [...pre, message]);
    });
  }, []);

  return (
    <div className="grid grid-cols-3 gap-4">
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            transition={{ type: "spring", bounce: 0.25, duration: 0.6 }}
            initial={{ transform: "scale(0)" }}
            animate={{ transform: "scale(1)" }}
            className={`${
              currentUser.user?.id === message.authorId
                ? "col-start-2 col-end-4"
                : "col-start-1 col-end-3"
            }`}
          >
            <MessageComponent
              author={message.authorName}
              isOwnMessage={currentUser.user?.id === message.authorId}
              message={message.message}
              backgroundColor={bgColor(message.authorId)}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
