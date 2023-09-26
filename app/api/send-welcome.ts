"use server";

import { currentUser } from "@clerk/nextjs";

import { CONNECTIONS_CHANNEL, WELCOME_EVENT } from "../shared/connection";
import { pusherServer } from "../shared/pusher-server";

export async function sendWelcome() {
  const user = await currentUser();

  if (!user) {
    return;
  }

  await pusherServer.trigger(CONNECTIONS_CHANNEL, WELCOME_EVENT, user.id);
}
