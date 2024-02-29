import { AuthenticationError } from "apollo-server";
import moment from "moment";
import ContextType from "src/graphql/ContextType";

export const AdminRemoveBrandMutation = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.admin?.id;
  const removeBrand = await knex.table("brands").del().where({ id });
  if (removeBrand) {
    await knex.table("activity_log").insert({
      admin_id: admin_id,
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }',':'remove_brand', 'admin_id': '${admin_id}', 'logged_at': '${moment()
          .tz("Asia/Phnom_Penh")
          .format("DD-MM-YYYY hh:mm:ss A")}'}`
      ),
    });
    return true;
  } else {
    new AuthenticationError("Something went wrong");
  }
};
