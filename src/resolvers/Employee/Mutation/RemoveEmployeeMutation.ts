import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const RemoveEmpolyeeMutation = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const employee = await knex.table("employee").del().where({ id });
  if (employee) {
    return true;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
