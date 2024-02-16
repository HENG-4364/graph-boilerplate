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
import { AssignRoleToEmployee } from "../Role/Mutation/AssignRoleToEmployeeMutation";
import { CreateAdminMutation } from "../Admin/Mutation/CreateAdminMutation";
import { authMiddleWare } from "./../../middlewares/authMiddleWare";
import { AdminListQuery } from "../Admin/Query/AdminListQuery";
import { AdminDetail } from "../Admin/Query/AdminDetailQuery";
import { LoginEmployeeMutation } from "../Employee/Mutation/LoginEmployeeMutation";
import { LoginAdminMutation } from "../Admin/Mutation/LoginAdminMutation";
import { AdminMeQuery } from "../Admin/Query/AdminMeQuery";

const AppResolver = [
  {
    Query: {
      adminMe: authMiddleWare(AdminMeQuery),
      employeeList: authMiddleWare(EmployeeListQuery),
      roleList: RoleListQuery,
      employee: EmployeeDetailQuery,
      role: RoleDetailQuery,
      adminList: AdminListQuery,
      adminDetail: AdminDetail,
    },
    Upload: GraphQLUpload,
    Mutation: {
      createEmployee: CreateHrEmployeeMutation,
      updateEmployee: UpdateEmpolyeeMutation,
      removeEmployee: RemoveEmpolyeeMutation,
      createRole: CreateRoleMutation,
      updateRole: updateRoleMutation,
      removeRole: RemoveRoleMutation,
      assignRoleToEmployee: AssignRoleToEmployee,
      createAdmin: CreateAdminMutation,
      loginAdmin: LoginAdminMutation,
      loginEmployee: LoginEmployeeMutation,
    },
  },
];

export default AppResolver;