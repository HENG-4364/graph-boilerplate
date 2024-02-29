import ContextType from "src/graphql/ContextType";

export const AdminMeQuery = (_, {}: {}, ctx: ContextType) => {
  return ctx.admin;
};
