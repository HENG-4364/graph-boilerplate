import { AuthenticationError } from "apollo-server";
import ContextType from "src/graphql/ContextType";

export const AssignRoleToEmployee = async (
  _,
  { roleId, empolyeeId }: { roleId: number; empolyeeId: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;

  const checkEmployee = await knex
    .table("employee")
    .where({ id: empolyeeId })
    .first();
  const checkRole = await knex.table("roles").where({ id: roleId }).first();
  if (checkEmployee && checkRole) {
    const roleEmployeePermission = await knex
      .table("role_permissions")
      .where("employee_id", "=", empolyeeId)
      .first();
    if (roleEmployeePermission) {
      await knex
        .table("role_permissions")
        .del()
        .where({ id: roleEmployeePermission.id });
    }
    const [assignRoleToEmployee] = await knex.table("role_permissions").insert({
      employee_id: empolyeeId,
      role_id: roleId,
    });
    if (assignRoleToEmployee) {
      await knex.table("role_permissions").where({
        id: Number(assignRoleToEmployee),
      });
      return assignRoleToEmployee;
    } else {
      throw new AuthenticationError("Something went wrong");
    }
  } else {
    throw new AuthenticationError("EmployeeId Or RoleId Undefind");
  }
};
