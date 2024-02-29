import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const CreateRoleMutation = async (
  _,
  { input }: { input: Graph.RoleInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const [role] = await knex("roles").insert({
    roleName: input?.roleName,
  });
  if (role) {
    await knex.table("employee").where({
      id: Number(role),
    });
    return role;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
