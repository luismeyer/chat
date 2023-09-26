"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../shared/pusher-client";
import {
  CONNECTIONS_CHANNEL,
  Connection,
  JOIN_EVENT,
} from "../shared/connection";
import { AnimatePresence, motion } from "framer-motion";
import { useUser } from "@clerk/nextjs";
import { sendWelcome } from "../api/send-welcome";

const channel = pusherClient.subscribe(CONNECTIONS_CHANNEL);

export function ConnectionToasts() {
  const { user } = useUser();

  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    channel.bind(JOIN_EVENT, async function ({ username, userId }: Connection) {
      if (!user || user?.id === userId) {
        return;
      }

      await sendWelcome();

      setToasts((pre) => [...pre, `${username} joined the chat 🚀`]);

      // clear the toast after 1 second
      setTimeout(() => {
        setToasts((pre) => pre.slice(1));
      }, 1000);
    });
  }, [user]);

  return (
    <div className="fixed left-3 right-3 top-3 grid gap-4 z-20">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast}
            className="bg-rainbow p-3 rounded-lg shadow-lg font-bold text-center text-white text-lg"
            initial={{ transform: "translateX(+100%)" }}
            animate={{ transform: "translateX(0)" }}
            exit={{ transform: "translateX(+100%)" }}
          >
            {toast}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
