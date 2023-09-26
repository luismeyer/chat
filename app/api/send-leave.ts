"use server";

import { currentUser } from "@clerk/nextjs";

import { CONNECTIONS_CHANNEL, LEAVE_EVENT } from "../shared/connection";
import { pusherServer } from "../shared/pusher-server";

export async function sendLeave() {
  console.log("LEAVE");

  const user = await currentUser();

  if (!user) {
    return;
  }

  await pusherServer.trigger(CONNECTIONS_CHANNEL, LEAVE_EVENT, user.id);
}
