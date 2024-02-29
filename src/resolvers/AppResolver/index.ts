import { GraphQLUpload } from "graphql-upload-minimal";
import { EmployeeListQuery } from "../Employee/Query/EmployeeListQuery";
import { CreateHrEmployeeMutation } from "../Employee/Mutation/CreateEmployeeMutation";
import { UpdateEmpolyeeMutation } from "../Employee/Mutation/UpdateEmployeeMutation";
import { RemoveEmpolyeeMutation } from "../Employee/Mutation/RemoveEmployeeMutation";
import { RoleListQuery } from "../Admin/Role/Query/RoleListQuery";
import { CreateRoleMutation } from "../Admin/Role/Mutation/CreateRoleMutation";
import { updateRoleMutation } from "../Admin/Role/Mutation/UpdateRoleMutation";
import { RemoveRoleMutation } from "../Admin/Role/Mutation/RemoveRoleMutation";
import { EmployeeDetailQuery } from "../Employee/Query/EmployeeDetailQuery";
import { RoleDetailQuery } from "../Admin/Role/Query/RoleDetailQuery";
import { CreateAdminMutation } from "../Admin/AdminUser/Mutation/CreateAdminMutation";
import { authMiddleWare } from "./../../middlewares/authMiddleWare";
import { AdminListQuery } from "../Admin/AdminUser/Query/AdminListQuery";
import { AdminDetail } from "../Admin/AdminUser/Query/AdminDetailQuery";
import { LoginEmployeeMutation } from "../Employee/Mutation/LoginEmployeeMutation";
import { LoginAdminMutation } from "../Admin/AdminUser/Mutation/LoginAdminMutation";
import { AdminMeQuery } from "../Admin/AdminUser/Query/AdminMeQuery";
import { EmployeeMeQuery } from "../Employee/Query/EmployeeMeQuery";
import { authEmployeeMiddleware } from "./../../middlewares/authEmployeeMiddleware";
import { AssignRoleToAdmin } from "../Admin/Role/Mutation/AssignRoleToAdminMutation";
import { RemoveAdminMutation } from "../Admin/AdminUser/Mutation/RemoveAdminMutation";
import { ActivityLogsList } from "../ActivityLog/Query/ActivityLogQuery";
import { AdminCreateBrandMutation } from "../Admin/Brand/Mutation/AdminCreateBrandMutation";
import { AdminBrandsListQuery } from "../Admin/Brand/Query/AdminBrandListQuery";
import { AdminUpdateBrandMutaion } from "../Admin/Brand/Mutation/AdminUpdatebrandMutation";
import { AdminRemoveBrandMutation } from "../Admin/Brand/Mutation/AdminRemoveBrandMutation";

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
      adminBrandList: authMiddleWare(AdminBrandsListQuery),
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
      adminCreateBrand: authMiddleWare(AdminCreateBrandMutation),
      adminUpdateBrand: authMiddleWare(AdminUpdateBrandMutaion),
      adminRemoveBrand: authMiddleWare(AdminRemoveBrandMutation),
    },
  },
];

export default AppResolver;
