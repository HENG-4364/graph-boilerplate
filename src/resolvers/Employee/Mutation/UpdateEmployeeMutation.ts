import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import moment from "moment-timezone";
export const UpdateEmpolyeeMutation = async (
  _,
  { id, input }: { id: number; input: Graph.EmployeeInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.admin?.id;
  const employee = await knex
    .table("employee")
    .update({
      firstname: input?.firstname,
      lastname: input?.lastname,
      gender: input?.gender,
      tel: input?.tel,
      email: input?.email,
      address: input?.address,
      country: input?.country,
    })
    .where({ id });
  if (employee) {
    await knex.table("employee").where({
      id: Number(employee),
    });
    await knex.table("activity_log").insert({
      admin_id: admin_id,
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }',':'update_employee', 'employee_id': '${id}', 'logged_at': '${moment()
          .tz("Asia/Phnom_Penh")
          .format("DD-MM-YYYY hh:mm:ss A")}'}`
      ),
    });
    return employee;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
