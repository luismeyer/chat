"use client";

import {
  MESSAGES_CHANNEL,
  Message,
  MessageSchema,
  NEW_MESSAGE_EVENT,
} from "../shared/message";
import { useEffect, useState } from "react";
import { Message as MessageComponent } from "./message";
import { pusherClient } from "../shared/pusher-client";

export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(MESSAGES_CHANNEL);

    channel.bind(NEW_MESSAGE_EVENT, function (data: unknown) {
      const message = MessageSchema.parse(data);

      console.log({ message });

      setMessages((pre) => [...pre, message]);
    });
  }, []);

  return (
    <>
      {messages.map((message) => (
        <MessageComponent
          key={message.id}
          author={message.authorName}
          date={message.createdAt}
          message={message.message}
        />
      ))}
    </>
  );
}
