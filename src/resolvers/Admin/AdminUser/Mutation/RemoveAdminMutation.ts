import { AuthenticationError } from "apollo-server";
import ContextType from "src/graphql/ContextType";

export const RemoveAdminMutation = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const removeAdmin = await knex.table("admins").del().where({ id });
  if (removeAdmin) {
    await knex.table("role_permissions").del().where({
      admin_id: id,
    });
    return true;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
