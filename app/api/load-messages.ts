import { z } from "zod";
import { db } from "./db";

const Message = z.object({
  id: z.number(),
  message: z.string(),
  authorName: z.string(),
  createdAt: z.coerce.date(),
});

type Message = z.infer<typeof Message>;

export async function loadMessages(): Promise<Message[]> {
  const query = await db.execute("select * from messages");

  return query.rows.map((row) => Message.parse(row));
}
