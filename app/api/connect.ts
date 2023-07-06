import { User } from "@clerk/backend";

export async function connect(user: User) {
  console.log("conntected", user);
}
