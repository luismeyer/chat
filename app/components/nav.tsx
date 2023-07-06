"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white flex items-center justify-between p-6 shadow-md">
      <h1 className="text-teal-300 text-xl font-bold">Luis ChatRoom</h1>

      <div className="w-8 h-8">
        <UserButton />
      </div>
    </header>
  );
}
