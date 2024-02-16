import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import bcrypt from "bcryptjs";
import { generateToken } from "./../../../utils/jwt";
export const LoginEmployeeMutation = async (
  _,
  { input }: { input: Graph.LoginEmployee },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const getEmployee = await knex
    .table("employee")
    .where({
      username: input?.userName,
    })
    .first();
  if (input?.password === "" && input?.userName === "") {
    throw new AuthenticationError(
      `{"errorMessage": "Your username or password are empty", "typeError": "user_not_field_the_form"}`
    );
  }

  if (getEmployee === undefined) {
    throw new AuthenticationError(
      `{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`
    );
  }
  const checkPassword = bcrypt.compareSync(
    input?.password,
    getEmployee?.password
  );
  if (getEmployee === undefined && !checkPassword) {
    throw new AuthenticationError(
      `{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`
    );
  }
  if (!checkPassword) {
    throw new AuthenticationError(
      `{"errorMessage": "Your password is incorrect!", "typeError": "wrong_password"}`
    );
  }
  const token = generateToken(getEmployee.id);
  if (token) {
    return {
      token: token,
    };
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
