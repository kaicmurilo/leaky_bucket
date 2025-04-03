import { buildSchema } from "graphql";
import { PixResolver } from "./resolvers/PixResolver";

export const schema = buildSchema(`
  type Query {
    ping: String
  }

  type Mutation {
    queryPixKey(key: String!): QueryPixKeyResponse
  }

  type QueryPixKeyResponse {
    success: Boolean!
    message: String!
  }
`);

export const root = {
  ping: () => "pong",
  ...PixResolver,
};
