import { User } from "../../domain/User";

const users: User[] = [
  { id: "user1", name: "Kaic", email: "kaic@live.com" },
  { id: "user2", name: "Murilo", email: "murilo@live.com" },
];

export function findUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
