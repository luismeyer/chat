import webPush from "web-push";

import { currentUser } from "@clerk/nextjs";

import {
  Connection,
  CONNECTIONS_CHANNEL,
  NEW_CONNECTION_EVENT,
} from "../shared/connection";
import { pusherServer } from "../shared/pusher-server";
import { SavedSubscriptionSchema } from "../shared/subscription";
import { buildUsername } from "../shared/username";
import { db } from "./db";

async function sendWebPushNotification(id: string, username: string) {
  if (!process.env.NEXT_PUBLIC_VAPID_KEY) {
    throw new Error("Missing env var: NEXT_PUBLIC_VAPID_KEY");
  }

  if (!process.env.PRIVATE_VAPID_KEY) {
    throw new Error("Missing env var: PRIVATE_VAPID_KEY");
  }

  webPush.setVapidDetails(
    "mailto:luis_meyer@outlook.de",
    process.env.NEXT_PUBLIC_VAPID_KEY,
    process.env.PRIVATE_VAPID_KEY
  );

  const { rows } = await db.execute(
    "SELECT * FROM subscriptions WHERE NOT userId = ?",
    [id]
  );

  const subscriptions = rows.map((row) => SavedSubscriptionSchema.parse(row));

  const payload = JSON.stringify({
    title: "Luis ChatRoom",
    body: `${username} joined the channel`,
  });

  const promises = subscriptions.map(({ auth, endpoint, p256dh }) =>
    webPush.sendNotification(
      {
        endpoint,
        keys: { auth, p256dh },
      },
      payload
    )
  );

  await Promise.all(promises);
}

export async function connect() {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const username = buildUsername(user);

  const newConnection: Connection = {
    username,
    userId: user.id,
  };

  await pusherServer.trigger(
    CONNECTIONS_CHANNEL,
    NEW_CONNECTION_EVENT,
    newConnection
  );

  try {
    await sendWebPushNotification(user.id, username);
  } catch (error) {
    console.error("Error sending notifications", error);
  }
}
