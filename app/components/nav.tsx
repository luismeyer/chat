import { UserButton } from "@clerk/nextjs";
import { Subscription } from "./subscription";
import { isSubscribed } from "../api/is-subscribed";

export async function Nav() {
  const subscribed = await isSubscribed();

  return (
    <header className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between p-6 shadow-md">
      <h1 className="text-teal-300 text-xl font-bold">Luis ChatRoom</h1>

      <div className="flex gap-2">
        <Subscription subscribed={subscribed} />

        <UserButton />
      </div>
    </header>
  );
}
