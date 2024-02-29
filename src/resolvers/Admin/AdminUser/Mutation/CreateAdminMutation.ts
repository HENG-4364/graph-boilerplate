import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import bcrypt from "bcryptjs";
import { AuthenticationError } from "apollo-server";
export const CreateAdminMutation = async (
  _,
  { input }: { input: Graph.AdminInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin = await knex
    .table("admins")
    .where({ username: input?.username })
    .first();
  if (admin) {
    throw new AuthenticationError(`Username already created!`);
  }
  const hash = bcrypt.hashSync(input?.password, 12);

  const [createAdmin] = await knex.table("admins").insert({
    fullname: input?.fullname ? input?.fullname : undefined,
    username: input?.username ? input?.username : undefined,
    password: input?.password ? hash : undefined,
    phone_number: input?.phoneNumber ? input?.phoneNumber : undefined,
    profile: input?.profile,
  });
  if (createAdmin) {
    await knex.table("admins").where({
      id: Number(createAdmin),
    });
    return createAdmin;
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
