import { z } from "zod";

export const ConnectionSchema = z.object({
  username: z.string(),
  userId: z.string(),
});

export type Connection = z.infer<typeof ConnectionSchema>;

export const CONNECTIONS_CHANNEL = "connections";
export const NEW_CONNECTION_EVENT = "newConnection";
