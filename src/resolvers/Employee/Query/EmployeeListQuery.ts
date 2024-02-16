import moment from "moment-timezone";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const EmployeeListQuery = async (
  _,
  { pagination }: { pagination?: Graph.PaginationInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const query = knex("employee");
  if (pagination?.size && pagination?.page) {
    const offset = (pagination?.page - 1) * pagination?.size;
    query.offset(offset).limit(pagination?.size);
  }
  const employeeListQuery = await query;
  const employeeList = employeeListQuery.map((employee) => ({
    ...employee,
    created_at: moment(employee.created_at).format("DD/MMM/YYYY"),
    updated_at: moment(employee.updated_at).format("DD/MMM/YYYY"),
  }));
  const employeeCount = await knex("employee");
  return {
    data: [...employeeList],
    pagination: {
      size: pagination?.size,
      total: employeeCount?.length,
      current: pagination?.page || 1,
    },
  };
};
