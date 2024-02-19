import { AuthenticationError } from "apollo-server";
import moment from "moment-timezone";
import ContextType from "src/graphql/ContextType";

export const RemoveEmpolyeeMutation = async (
  _,
  { id }: { id: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.admin?.id;
  const employee = await knex.table("employee").del().where({ id });
  if (employee) {
    await knex.table("activity_log").insert({
      admin_id: admin_id,
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }',':'remove_employee', 'employee_id': '${id}', 'logged_at': '${moment()
          .tz("Asia/Phnom_Penh")
          .format("DD-MM-YYYY hh:mm:ss A")}'}`
      ),
    });
    return true;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
