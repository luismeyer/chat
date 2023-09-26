"use server";

import { currentUser } from "@clerk/nextjs";
import {
  MESSAGES_CHANNEL,
  Message,
  NEW_MESSAGE_EVENT,
} from "../shared/message";
import { pusherServer } from "../shared/pusher-server";
import { buildUsername } from "../shared/username";

export async function sendMessage(text: string) {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const message: Message = {
    message: text,
    createdAt: new Date(),
    id: Math.random(),
    authorName: buildUsername(user),
    authorId: user.id,
  };

  await pusherServer.trigger(MESSAGES_CHANNEL, NEW_MESSAGE_EVENT, message);
}
