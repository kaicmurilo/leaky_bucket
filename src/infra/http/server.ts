import Koa from "koa";
import bodyParser from "koa-bodyparser";
import { graphqlHTTP } from "koa-graphql";
import Router from "koa-router";
import { root, schema } from "../../app/graphql/schema";
import { authMiddleware } from "../../app/middlewares/auth.middleware";

const app = new Koa();
const router = new Router();

app.use(bodyParser());

router.all(
  "/graphql",
  authMiddleware,
  graphqlHTTP((ctx: any) => ({
    schema,
    rootValue: root,
    context: ctx.state,
    graphiql: true,
  }))
);

app.use(router.routes()).use(router.allowedMethods());

export default app;
