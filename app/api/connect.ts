import { User } from "@clerk/backend";
import { pusherServer } from "../shared/pusher-server";
import {
  CONNECTIONS_CHANNEL,
  NEW_CONNECTION_EVENT,
} from "../shared/connection";
import { username } from "../shared/username";

export async function connect(user: User) {
  await pusherServer.trigger(CONNECTIONS_CHANNEL, NEW_CONNECTION_EVENT, {
    username: username(user),
  });
}
