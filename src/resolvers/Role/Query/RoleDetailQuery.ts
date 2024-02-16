import { AuthenticationError } from "apollo-server";
import { log } from "console";
import moment from "moment-timezone";
import ContextType from "src/graphql/ContextType";

export const RoleDetailQuery = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const roleDetail = await knex.table("roles").where({ id }).first();
  if (roleDetail) {
    return {
      ...roleDetail,
      created_at: moment(roleDetail.created_at).format("DD/MMM/YYYY"),
      updated_at: moment(roleDetail.updated_at).format("DD/MMM/YYYY"),
    };
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
