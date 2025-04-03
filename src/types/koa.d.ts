import "koa";
import { User } from "../domain/User";

declare module "koa" {
  interface DefaultState {
    user?: User;
  }
}
