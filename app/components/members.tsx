"use client";

import { useCallback, useEffect, useState } from "react";

import {
  CONNECTIONS_CHANNEL,
  Connection,
  JOIN_EVENT,
  LEAVE_EVENT,
  WELCOME_EVENT,
} from "../shared/connection";
import { pusherClient } from "../shared/pusher-client";
import { useUser } from "@clerk/nextjs";
import { connect } from "../api/connect";
import { loadMember } from "../api/load-member";
import { Member } from "../shared/member";
import Image from "next/image";
import { sendLeave } from "../api/send-leave";

const channel = pusherClient.subscribe(CONNECTIONS_CHANNEL);

export function Members() {
  const { user } = useUser();

  const [members, setMembers] = useState<Member[]>([]);

  const join = useCallback(
    async (id: string) => {
      if (members.some((member) => member.id === id) || user?.id === id) {
        return;
      }

      const data = await loadMember(id);

      if (data) {
        setMembers((pre) => [...pre, data]);
      }
    },
    [members, user?.id]
  );

  const leave = useCallback(
    async (id: string) => {
      if (user?.id === id) {
        return;
      }

      setMembers((pre) => pre.filter((member) => member.id !== id));
    },
    [user?.id]
  );

  useEffect(() => {
    if (!user) {
      return;
    }

    function joinHandler({ userId }: Connection) {
      join(userId);
    }

    channel.bind(WELCOME_EVENT, join);

    channel.bind(JOIN_EVENT, joinHandler);

    channel.bind(LEAVE_EVENT, leave);

    return () => {
      channel.unbind(WELCOME_EVENT, join);
      channel.unbind(JOIN_EVENT, joinHandler);

      channel.unbind(JOIN_EVENT, leave);
    };
  }, [join, leave, user]);

  useEffect(() => {
    void connect();

    async function unload(event: BeforeUnloadEvent) {
      event.preventDefault();
      event.returnValue = false;

      await sendLeave();
    }

    window.addEventListener("beforeunload", unload);

    return () => {
      window.removeEventListener("beforeunload", unload);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div>
      {members.map(({ id, image, username }) => (
        <div key={id}>
          <span>{username}</span>
          <Image
            className="rounded-full"
            width={32}
            height={32}
            alt="Profile"
            src={image}
          />
        </div>
      ))}
    </div>
  );
}
