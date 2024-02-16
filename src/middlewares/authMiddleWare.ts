import { ResolverHandler } from "src/types/ResolverHandler";
import { decodedToken } from "./../utils/jwt";
import moment from "moment-timezone";
type ResolverMiddleware = (next: ResolverHandler) => ResolverHandler;
export const authMiddleWare: ResolverMiddleware = (next) => {
  // eslint-disable-next-line max-params
  return async (parents, args, context, info) => {
    const decoded = decodedToken(context?.req)!;
    const { userId } = decoded;
    const admin = await context.knex.default
      .table("admins")
      .where({ id: userId })
      .first();
    const Admin = {
      ...admin,
      created_at: moment(admin.created_at).format("DD/MMM/YYYY"),
      updated_at: moment(admin.updated_at).format("DD/MMM/YYYY"),
    };
    return next(parents, args, { ...context, decoded, admin: Admin }, info);
  };
};
