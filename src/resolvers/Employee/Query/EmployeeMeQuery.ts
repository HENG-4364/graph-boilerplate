import ContextType from "src/graphql/ContextType";

export const EmployeeMeQuery = (_, {}: {}, ctx: ContextType) => {
  return ctx.employee;
};
