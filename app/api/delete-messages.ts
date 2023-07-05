"use server";

import { revalidatePath } from "next/cache";
import { db } from "./db";

export async function deleteMessage(id: number) {
  await db.execute("DELETE FROM messages WHERE id=?", [id]);

  revalidatePath("/");
}
