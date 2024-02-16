import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const updateRoleMutation = async (
  _,
  { id, input }: { id: number; input: Graph.RoleInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const updateRole = await knex
    .table("roles")
    .update({
      roleName: input?.roleName,
    })
    .where({ id });
    
  if (updateRole) {
    return true;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
