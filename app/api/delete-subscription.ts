"use server";

import { db } from "./db";
import { currentUser } from "@clerk/nextjs";

export async function deleteSubscription() {
  const user = await currentUser();

  if (!user) {
    return;
  }

  await db.execute("DELETE FROM subscriptions WHERE userId = ?", [user.id]);
}
