"use server";

import { db } from "./db";
import { currentUser } from "@clerk/nextjs";

export async function isSubscribed(): Promise<boolean> {
  const user = await currentUser();

  if (!user) {
    return false;
  }

  const { rows } = await db.execute(
    "SELECT * FROM subscriptions WHERE userId = ?",
    [user.id]
  );

  return rows.length === 1;
}
