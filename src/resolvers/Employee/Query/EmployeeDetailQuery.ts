import ContextType from "src/graphql/ContextType";
import moment from "moment-timezone";
export const EmployeeDetailQuery = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const employeeDetail = await knex.table("employee").where({ id }).first();
  return {
    ...employeeDetail,
    created_at: moment(employeeDetail.created_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY"),
    updated_at: moment(employeeDetail.updated_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY"),
  };
};
