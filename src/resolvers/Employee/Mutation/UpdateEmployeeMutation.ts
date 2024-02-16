import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const UpdateEmpolyeeMutation = async (
  _,
  { id, input }: { id: number; input: Graph.EmployeeInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
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
    return employee;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
