import { User } from "../types";

const allowedUserIds = [
  "user001",
  "user002",
  "user003",
  "user004",
  "user005",
  "user006",
  "user007",
  "user008",
];

export const randomId =
  allowedUserIds[Math.floor(Math.random() * allowedUserIds.length)];

export const getInitials = (user: User) => {
  const name = user?.name?.trim() || "";
  const words = name.split(" ");
  const initials =
    words.length >= 2
      ? words[0][0].toUpperCase() + words[1][0].toUpperCase()
      : words[0]?.[0]?.toUpperCase() || "?";
  return initials;
};
