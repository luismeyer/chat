import Pusher from "pusher-js";

if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
  throw new Error("Missing Env Variable NEXT_PUBLIC_PUSHER_KEY");
}

export const pusherClient = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: "eu",
});
