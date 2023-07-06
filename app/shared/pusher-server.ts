import Pusher from "pusher";

if (!process.env.PUSHER_SECRET) {
  throw new Error("Missing Env Variable PUSHER_SECRET");
}

if (!process.env.PUSHER_APP_ID) {
  throw new Error("Missing Env Variable PUSHER_APP_ID");
}

if (!process.env.NEXT_PUBLIC_PUSHER_KEY) {
  throw new Error("Missing Env Variable NEXT_PUBLIC_PUSHER_KEY");
}

export const pusherServer = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.NEXT_PUBLIC_PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: "eu",
  useTLS: true,
});
