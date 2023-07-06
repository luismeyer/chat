type UsernameOptions = {
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
};

export function username({ username, firstName, lastName }: UsernameOptions) {
  const customUsername =
    firstName && lastName
      ? firstName?.slice(0, 3) + lastName?.slice(0, 3)
      : undefined;

  return username ?? customUsername ?? firstName ?? lastName ?? "unkown user";
}
