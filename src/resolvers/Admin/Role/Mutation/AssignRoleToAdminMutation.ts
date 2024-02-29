import { AuthenticationError } from "apollo-server";
import ContextType from "src/graphql/ContextType";

export const AssignRoleToAdmin = async (
  _,
  { roleId, adminId }: { roleId: number; adminId: number },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;

  const checkAdmin = await knex.table("admins").where({ id: adminId }).first();
  const checkRole = await knex.table("roles").where({ id: roleId }).first();
  if (checkAdmin && checkRole) {
    const roleEmployeePermission = await knex
      .table("role_permissions")
      .where("admin_id", "=", adminId)
      .first();
    if (roleEmployeePermission) {
      await knex
        .table("role_permissions")
        .del()
        .where({ id: roleEmployeePermission.id });
    }
    const [assignRoleToAdmin] = await knex.table("role_permissions").insert({
      admin_id: adminId,
      role_id: roleId,
    });
    if (assignRoleToAdmin) {
      await knex.table("role_permissions").where({
        id: Number(assignRoleToAdmin),
      });
      return assignRoleToAdmin;
    } else {
      throw new AuthenticationError("Something went wrong");
    }
  } else {
    throw new AuthenticationError("EmployeeId Or RoleId Undefind");
  }
};
