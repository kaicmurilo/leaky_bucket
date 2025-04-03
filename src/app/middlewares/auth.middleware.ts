import { Context, Next } from "koa";
import { verifyToken } from "../../infra/auth/token";
import { findUserById } from "../tenants/user-repository";

export async function authMiddleware(ctx: Context, next: Next) {
  const authHeader = ctx.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    ctx.status = 401;
    ctx.body = "Unauthorized";
    return;
  }

  try {
    const token = authHeader.replace("Bearer ", "").trim();
    const { userId } = verifyToken(token);

    const user = findUserById(userId);
    if (!user) {
      ctx.status = 403;
      ctx.body = "User not found";
      return;
    }

    ctx.state.user = user;
    await next();
  } catch {
    ctx.status = 403;
    ctx.body = "Forbidden";
  }
}
