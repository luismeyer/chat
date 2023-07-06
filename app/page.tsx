import { Nav } from "./components/nav";
import { connect } from "./api/connect";
import { Input } from "./components/input";
import { MessageList } from "./components/message-list";
import { currentUser } from "@clerk/nextjs";
import { ConnectionToasts } from "./components/connection-toasts";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  await connect(user);

  return (
    <>
      <Nav />

      <main className="pt-20 pb-20 px-4 md:px-10 m-auto mt-10 grid gap-4">
        <ConnectionToasts />

        <MessageList />

        <Input />
      </main>
    </>
  );
}
