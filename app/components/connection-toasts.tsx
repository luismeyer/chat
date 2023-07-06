"use client";

import { useEffect, useState } from "react";
import { pusherClient } from "../shared/pusher-client";
import {
  CONNECTIONS_CHANNEL,
  ConnectionSchema,
  NEW_CONNECTION_EVENT,
} from "../shared/connection";
import { AnimatePresence, motion } from "framer-motion";

export function ConnectionToasts() {
  const [toasts, setToasts] = useState<string[]>([]);

  useEffect(() => {
    const channel = pusherClient.subscribe(CONNECTIONS_CHANNEL);

    channel.bind(NEW_CONNECTION_EVENT, function (data: unknown) {
      const { username } = ConnectionSchema.parse(data);

      setToasts((pre) => [...pre, `${username} joined the chat 🚀`]);

      // clear the toast after 1 second
      setTimeout(() => {
        setToasts((pre) => pre.slice(1));
      }, 1000);
    });
  }, []);

  return (
    <div className="fixed left-3 right-3 top-3 grid gap-4">
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
