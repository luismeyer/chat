import { Nav } from "./components/nav";
import { connect } from "./api/connect";
import { Input } from "./components/input";
import { MessageList } from "./components/message-list";
import { currentUser } from "@clerk/nextjs";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return null;
  }

  await connect(user);

  return (
    <>
      <Nav />

      <main className="pt-20 pb-20 px-10 md:w-1/2 m-auto mt-10 grid gap-4">
        <MessageList />

        <Input />
      </main>
    </>
  );
}
