"use server";

import {
  MESSAGES_CHANNEL,
  Message,
  NEW_MESSAGE_EVENT,
} from "../shared/message";
import { pusherServer } from "../shared/pusher-server";

type Author = {
  id: string;
  username: string;
};

export async function sendMessage(
  text: string,
  { id, username: userame }: Author
) {
  const message: Message = {
    message: text,
    createdAt: new Date(),
    id: Math.random(),
    authorName: userame,
    authorId: id,
  };

  await pusherServer.trigger(MESSAGES_CHANNEL, NEW_MESSAGE_EVENT, message);
}
