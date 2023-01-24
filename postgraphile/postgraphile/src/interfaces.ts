import { GraphQLSchema } from "graphql";

export interface ServerParams {
  schema: GraphQLSchema;
  resolvedPreset: GraphileConfig.ResolvedPreset;
}
