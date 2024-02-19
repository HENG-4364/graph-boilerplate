import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
export const CreateHrEmployeeMutation = async (
  _,
  { input }: { input: Graph.EmployeeInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.admin?.id;

  const employee = await knex
    .table("employee")
    .where({
      username: input?.userName,
    })
    .first();
  if (employee) {
    throw new AuthenticationError(`Username already created!`);
  }
  const hash = bcrypt.hashSync(input?.password, 12);
  const [createEmployee] = await knex.table("employee").insert({
    profile: input?.profile ? input?.profile : null,
    username: input?.userName ? input?.userName : undefined,
    password: input?.password ? hash : undefined,
    firstname: input?.firstname,
    lastname: input?.lastname,
    gender: input?.gender,
    tel: input?.tel,
    email: input?.email,
    address: input?.address,
    country: input?.country,
  });
  if (createEmployee) {
    await knex.table("employee").where({
      id: Number(createEmployee),
    });
    await knex.table("activity_log").insert({
      admin_id: admin_id,
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }',':'create_employee', 'employee_id': '${createEmployee}', 'logged_at': '${moment()
          .tz("Asia/Phnom_Penh")
          .format("DD-MM-YYYY hh:mm:ss A")}'}`
      ),
    });
    return createEmployee;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
