import ContextType from "src/graphql/ContextType";
import moment from "moment-timezone";
export const AdminDetail = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const adminDetail = await knex.table("admins").where({ id }).first();
  return {
    ...adminDetail,
    created_at: moment(adminDetail.created_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY"),
    updated_at: moment(adminDetail.updated_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY"),
  };
};
