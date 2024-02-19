import { GraphQLUpload } from "graphql-upload-minimal";
import { EmployeeListQuery } from "../Employee/Query/EmployeeListQuery";
import { CreateHrEmployeeMutation } from "../Employee/Mutation/CreateEmployeeMutation";
import { UpdateEmpolyeeMutation } from "../Employee/Mutation/UpdateEmployeeMutation";
import { RemoveEmpolyeeMutation } from "../Employee/Mutation/RemoveEmployeeMutation";
import { RoleListQuery } from "../Role/Query/RoleListQuery";
import { CreateRoleMutation } from "../Role/Mutation/CreateRoleMutation";
import { updateRoleMutation } from "../Role/Mutation/UpdateRoleMutation";
import { RemoveRoleMutation } from "../Role/Mutation/RemoveRoleMutation";
import { EmployeeDetailQuery } from "../Employee/Query/EmployeeDetailQuery";
import { RoleDetailQuery } from "../Role/Query/RoleDetailQuery";
import { CreateAdminMutation } from "../Admin/Mutation/CreateAdminMutation";
import { authMiddleWare } from "./../../middlewares/authMiddleWare";
import { AdminListQuery } from "../Admin/Query/AdminListQuery";
import { AdminDetail } from "../Admin/Query/AdminDetailQuery";
import { LoginEmployeeMutation } from "../Employee/Mutation/LoginEmployeeMutation";
import { LoginAdminMutation } from "../Admin/Mutation/LoginAdminMutation";
import { AdminMeQuery } from "../Admin/Query/AdminMeQuery";
import { EmployeeMeQuery } from "../Employee/Query/EmployeeMeQuery";
import { authEmployeeMiddleware } from "./../../middlewares/authEmployeeMiddleware";
import { AssignRoleToAdmin } from "../Role/Mutation/AssignRoleToAdminMutation";
import { RemoveAdminMutation } from "../Admin/Mutation/RemoveAdminMutation";
import { ActivityLogsList } from "../ActivityLog/Query/ActivityLogQuery";

const AppResolver = [
  {
    Query: {
      adminMe: authMiddleWare(AdminMeQuery),
      employeeMe: authEmployeeMiddleware(EmployeeMeQuery),
      employeeList: authMiddleWare(EmployeeListQuery),
      roleList: authMiddleWare(RoleListQuery),
      employee: authMiddleWare(EmployeeDetailQuery),
      role: authMiddleWare(RoleDetailQuery),
      adminList: authMiddleWare(AdminListQuery),
      adminDetail: authMiddleWare(AdminDetail),
      activityLogsList: authMiddleWare(ActivityLogsList),
    },
    Upload: GraphQLUpload,
    Mutation: {
      createEmployee: CreateHrEmployeeMutation,
      updateEmployee: authMiddleWare(UpdateEmpolyeeMutation),
      removeEmployee: authMiddleWare(RemoveEmpolyeeMutation),
      createRole: authMiddleWare(CreateRoleMutation),
      updateRole: authMiddleWare(updateRoleMutation),
      removeRole: authMiddleWare(RemoveRoleMutation),
      assignRoleToAdmin: authMiddleWare(AssignRoleToAdmin),
      createAdmin: authMiddleWare(CreateAdminMutation),
      loginAdmin: LoginAdminMutation,
      loginEmployee: LoginEmployeeMutation,
      removeAdmin: authMiddleWare(RemoveAdminMutation),
    },
  },
];

export default AppResolver;
