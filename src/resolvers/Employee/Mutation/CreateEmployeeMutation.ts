import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import bcrypt from "bcryptjs";
export const CreateHrEmployeeMutation = async (
  _,
  { input }: { input: Graph.EmployeeInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
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
    return createEmployee;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
