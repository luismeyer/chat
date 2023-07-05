"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";

export async function sendMessage(message: string, authorName: string) {
  await db.execute("INSERT INTO messages (authorName, message) VALUES (?, ?)", [
    authorName,
    message,
  ]);

  revalidatePath("/");
}
