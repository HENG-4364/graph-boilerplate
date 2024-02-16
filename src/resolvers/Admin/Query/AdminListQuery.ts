import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import moment from "moment-timezone";

export const AdminListQuery = async (
  _,
  { pagination }: { pagination?: Graph.PaginationInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const query = knex.table("admins");
  if (pagination?.size && pagination?.page) {
    const offset = (pagination?.page - 1) * pagination?.size;
    query.offset(offset).limit(pagination?.size);
  }
  const adminListQuery = await query;
  const adminList = adminListQuery.map((admin) => ({
    ...admin,
    created_at: moment(admin.created_at).format("DD/MMM/YYYY"),
    updated_at: moment(admin.updated_at).format("DD/MMM/YYYY"),
  }));
  const adminCount = await knex.table("admins");
  return {
    data: [...adminList],
    pagination: {
      size: pagination?.size,
      total: adminCount?.length,
      current: pagination?.page || 1,
    },
  };
};
