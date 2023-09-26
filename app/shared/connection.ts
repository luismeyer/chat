export type Connection = {
  username: string;
  userId: string;
};

export const CONNECTIONS_CHANNEL = "connections";

// event is triggered when a user joins the chat
export const JOIN_EVENT = "join";
// all users that are already in the chat answer with this event
export const WELCOME_EVENT = "welcome";
// when a user leaves
export const LEAVE_EVENT = "leave";
