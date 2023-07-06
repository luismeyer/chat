import { z } from "zod";

export const MessageSchema = z.object({
  id: z.number(),
  message: z.string(),
  authorName: z.string(),
  createdAt: z.coerce.date(),
});

export type Message = z.infer<typeof MessageSchema>;

export const MESSAGE_CHANNEL = "messages";
export const NEW_MESSAGE_EVENT = "newMessage";
