"use server";

import { clerkClient, currentUser } from "@clerk/nextjs";
import { buildUsername } from "../shared/username";
import { Member } from "../shared/member";

export async function loadMember(id: string): Promise<Member | undefined> {
  const me = await currentUser();

  if (!me) {
    return;
  }

  const user = await clerkClient.users.getUser(id);

  if (!user) {
    return;
  }

  return { id, username: buildUsername(user), image: user.imageUrl };
}
