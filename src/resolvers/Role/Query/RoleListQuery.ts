import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import moment from "moment-timezone";
export const RoleListQuery = async (
  _,
  { pagination }: { pagination?: Graph.PaginationInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const query = knex("roles");
  if (pagination?.size && pagination?.page) {
    const offset = (pagination?.page - 1) * pagination?.size;
    query.offset(offset).limit(pagination?.size);
  }
  const roleListQuery = await query;
  const roleCount = await knex("roles");
  const roleList = roleListQuery.map((role) => ({
    ...role,
    created_at: moment(role.created_at).format("DD/MMM/YYYY"),
    updated_at: moment(role.updated_at).format("DD/MMM/YYYY"),
  }));
  return {
    data: [...roleList],
    pagination: {
      size: pagination?.size,
      total: roleCount?.length,
      current: pagination?.page || 1,
    },
  };
};
