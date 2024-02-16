import { AuthenticationError } from "apollo-server";
import knex from "knex";
import ContextType from "src/graphql/ContextType";

export const RemoveRoleMutation = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const removeRoleMutation = await knex.table("roles").del().where({ id });
  if (removeRoleMutation) {
    return true;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
