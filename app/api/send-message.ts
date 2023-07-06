"use server";

import { MESSAGE_CHANNEL, Message, NEW_MESSAGE_EVENT } from "../shared/message";
import { pusherServer } from "../shared/pusher-server";

export async function sendMessage(text: string, authorName: string) {
  const message: Message = {
    authorName,
    message: text,
    createdAt: new Date(),
    id: Math.random(),
  };

  await pusherServer.trigger(MESSAGE_CHANNEL, NEW_MESSAGE_EVENT, message);
}
