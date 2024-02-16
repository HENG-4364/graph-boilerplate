import { ResolverHandler } from "src/types/ResolverHandler";
import { decodedToken } from "../utils/jwt";
import moment from "moment-timezone";
type ResolverMiddleware = (next: ResolverHandler) => ResolverHandler;
export const authEmployeeMiddleware: ResolverMiddleware = (next) => {
  // eslint-disable-next-line max-params
  return async (parents, args, context, info) => {
    const decoded = decodedToken(context?.req)!;
    const { userId } = decoded;
    const employee = await context.knex.default
      .table("employee")
      .where({ id: userId })
      .first();
    const Employee = {
      ...employee,
      created_at: moment(employee.created_at).format("DD/MMM/YYYY"),
      updated_at: moment(employee.updated_at).format("DD/MMM/YYYY"),
    };
    return next(parents, args, { ...context, decoded, employee: Employee }, info);
  };
};