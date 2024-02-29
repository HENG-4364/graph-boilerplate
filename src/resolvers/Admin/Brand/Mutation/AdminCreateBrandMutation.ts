import { AuthenticationError } from "apollo-server";
import moment from "moment";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";

export const AdminCreateBrandMutation = async (
  _,
  { input }: { input: Graph.BrandInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.admin?.id;
  const getBrand = await knex
    .table("brands")
    .where({
      brand_name: input?.BrandName,
    })
    .first();
  if (getBrand) {
    throw new AuthenticationError(
      "The name of the Brand has been already exist"
    );
  } else {
    const [createBrand] = await knex.table("brands").insert({
      brand_image: input?.BrandImage ? input?.BrandImage : null,
      brand_name: input?.BrandName,
    });
    if (createBrand) {
      await knex.table("employee").where({
        id: Number(createBrand),
      });
      await knex.table("activity_log").insert({
        admin_id: admin_id,
        activity: JSON.stringify(
          `{'ip':'${
            ctx.ip
          }',':'create_brand', 'admin_id': '${admin_id}', 'logged_at': '${moment()
            .tz("Asia/Phnom_Penh")
            .format("DD-MM-YYYY hh:mm:ss A")}'}`
        ),
      });
      return createBrand;
    } else {
      throw new AuthenticationError("Something went wrong");
    }
  }
};
