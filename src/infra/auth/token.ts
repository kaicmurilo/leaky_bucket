import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

if (!process.env.SECRET) {
  throw new Error("SECRET is not defined");
}

const SECRET = process.env.SECRET;
const EXPIRES_IN = "1h";

export function generateToken(userId: string): string {
  return jwt.sign({ userId }, SECRET, { expiresIn: EXPIRES_IN });
}

export function verifyToken(token: string): { userId: string } {
  return jwt.verify(token, SECRET) as { userId: string };
}
