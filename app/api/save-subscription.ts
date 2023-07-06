"use server";

import { SubscriptionSchema } from "../shared/subscription";
import { db } from "./db";
import { currentUser } from "@clerk/nextjs";

export async function saveSubscription(input: string) {
  const user = await currentUser();

  if (!user) {
    return;
  }

  const {
    endpoint,
    keys: { auth, p256dh },
  } = SubscriptionSchema.parse(JSON.parse(input));

  await db.execute(
    "REPLACE INTO subscriptions (userId, endpoint, auth, p256dh) VALUES (?, ?, ?, ?)",
    [user.id, endpoint, auth, p256dh]
  );
}
