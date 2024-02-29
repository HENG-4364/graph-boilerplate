import moment from "moment";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const AdminBrandsListQuery = async (
  _,
  { pagination }: { pagination: Graph.PaginationInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const query = knex.table("brands");
  if (pagination?.size && pagination?.page) {
    const offset = (pagination?.page - 1) * pagination?.size;
    query.offset(offset).limit(pagination?.size);
  }
  const brandListQuery = await query;
  const brandList = brandListQuery.map((brand) => ({
    ...brand,
    created_at: moment(brand.created_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY hh:mm:ss A"),
    updated_at: moment(brand.updated_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY hh:mm:ss A"),
  }));
  const brandCount = await knex.table("brands");
  return {
    data: [...brandList],
    pagination: {
      total: brandCount?.length,
      size: pagination?.size,
      current: pagination?.page || 1,
    },
  };
};
