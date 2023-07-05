import { Nav } from "./components/nav";
import { loadMessages } from "./api/load-messages";
import { Message } from "./components/message";
import { Input } from "./components/input";

export default async function Home() {
  let messages = await loadMessages();

  return (
    <>
      <Nav />

      <main className="pt-20 pb-20 px-10 md:w-1/2 m-auto mt-10 grid gap-4">
        {messages.map((message) => (
          <Message
            key={message.id}
            id={message.id}
            author={message.authorName}
            date={message.createdAt}
            message={message.message}
          />
        ))}

        <Input />
      </main>
    </>
  );
}
