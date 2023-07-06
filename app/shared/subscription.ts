import { z } from "zod";

export const SubscriptionSchema = z.object({
  endpoint: z.string(),
  keys: z.object({
    auth: z.string(),
    p256dh: z.string(),
  }),
});

export type Subscription = z.infer<typeof SubscriptionSchema>;

export const SavedSubscriptionSchema = z.object({
  userId: z.string(),
  endpoint: z.string(),
  auth: z.string(),
  p256dh: z.string(),
});

export type SavedSubscription = z.infer<typeof SavedSubscriptionSchema>;
