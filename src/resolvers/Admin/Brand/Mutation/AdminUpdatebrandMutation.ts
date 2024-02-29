import { AuthenticationError } from "apollo-server";
import knex from "knex";
import moment from "moment";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const AdminUpdateBrandMutaion = async (
  _,
  { id, input }: { id: number; input: Graph.BrandInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.admin?.id;

  const updateBrand = await knex
    .table("brands")
    .update({
      brand_image: input?.BrandImage,
      brand_name: input?.BrandName,
    })
    .where({ id });
  if (updateBrand) {
    await knex.table("activity_log").insert({
      admin_id: admin_id,
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }',':'update_brand', 'admin_id': '${admin_id}', 'logged_at': '${moment()
          .tz("Asia/Phnom_Penh")
          .format("DD-MM-YYYY hh:mm:ss A")}'}`
      ),
    });
    return true;
  } else {
    throw new AuthenticationError("Id Not Found!");
  }
};
