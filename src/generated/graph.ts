/* eslint-disable */export declare namespace Graph {  export interface Query {    adminList?: null | AdminList;    adminDetail?: null | Admin;    adminMe?: null | Admin;    employeeList?: null | employeeList;    employee?: null | employee;    employeeMe?: null | employee;    testList?: string[] | null;    testDetail?: null | string;    roleList?: null | RoleList;    role?: null | Role;  }  export interface Mutation {    loginAdmin?: null | Token;    createAdmin: number;    updateAdmin?: null | boolean;    removeAdmin?: null | boolean;    loginEmployee?: null | Token;    createEmployee: number;    updateEmployee: number;    removeEmployee?: null | boolean;    createTest: number;    updateTest?: null | boolean;    createRole?: null | number;    updateRole?: null | boolean;    removeRole?: null | boolean;    assignRoleToEmployee?: null | number;    singleUpload: UploadedFile;    uploadDocument?: null | UploadedDocument;  }  export interface SignInInput {    username: string;    password: string;  }  export interface Token {    token?: null | string;    token?: null | string;  }  export interface Admin {    id?: null | number;    fullname?: null | string;    username?: null | string;    email?: null | string;    phoneNumber?: null | string;    profile?: null | string;    created_at?: null | string;    updated_at?: null | string;  }  export interface AdminList {    data?: Admin[] | null;    pagination?: null | Pagination;  }  export interface AdminInput {    fullname?: null | string;    username?: null | string;    password?: null | string;    email?: null | string;    phoneNumber?: null | string;    profile?: null | string;  }  export interface LoginEmployee {    userName?: null | string;    password?: null | string;  }  export interface EmployeeInput {    profile?: null | string;    userName?: null | string;    password?: null | string;    firstname?: null | string;    lastname?: null | string;    gender?: null | string;    tel?: null | string;    email?: null | string;    address?: null | string;    country?: null | string;  }  export interface employeeList {    data?: employee[] | null;    pagination?: null | Pagination;  }  export interface employee {    id?: null | number;    profile?: null | string;    userName?: null | string;    firstname?: null | string;    lastname?: null | string;    gender?: null | string;    tel?: null | string;    email?: null | string;    address?: null | string;    country?: null | string;    created_at?: null | string;    updated_at?: null | string;  }  export interface PaginationInput {    page?: null | number;    size?: null | number;  }  export interface Pagination {    total?: null | number;    size?: null | number;    current?: null | number;  }  export interface TestInput {    message?: null | string;  }  export interface RoleInput {    roleName?: null | string;  }  export interface RoleList {    data?: Role[] | null;    pagination?: null | Pagination;  }  export interface Role {    id?: null | number;    roleName?: null | string;    created_at?: null | string;    updated_at?: null | string;  }  export interface UploadedFile {    filename?: null | string;    url?: null | string;    fileSize?: null | string;    mimetype?: null | string;    width?: null | string;    height?: null | string;  }  export interface UploadedDocument {    name?: null | string;    type?: null | string;    size?: null | number;    ext?: null | string;    url?: null | string;  }}