import { AuthenticationError } from "apollo-server";
import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import bcrypt from "bcryptjs";
import moment from "moment-timezone";
import { generateToken } from "../../../utils/jwt";
export const LoginAdminMutation = async (
  _,
  { input }: { input: Graph.AdminInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const admin_id = await ctx.admin?.id;
  const getAdmin = await knex
    .table("admins")
    .where({
      username: input?.username,
    })
    .first();
  if (input?.password === "" && input?.username === "") {
    throw new AuthenticationError(
      `{"errorMessage": "Your username or password are empty", "typeError": "user_not_field_the_form"}`
    );
  }

  if (getAdmin === undefined) {
    throw new AuthenticationError(
      `{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`
    );
  }
  const checkPassword = bcrypt.compareSync(input?.password, getAdmin?.password);
  if (getAdmin === undefined && !checkPassword) {
    throw new AuthenticationError(
      `{"errorMessage": "Your username or password is incorrect!", "typeError": "wrong_username_or_password"}`
    );
  }
  if (!checkPassword) {
    throw new AuthenticationError(
      `{"errorMessage": "Your password is incorrect!", "typeError": "wrong_password"}`
    );
  }
  const token = generateToken(getAdmin.id);
  if (token) {
    await knex.table("activity_log").insert({
      admin_id: getAdmin.id,
      activity: JSON.stringify(
        `{'ip':'${
          ctx.ip
        }',':'admin_login','logged_at': '${moment()
          .tz("Asia/Phnom_Penh")
          .format("DD-MM-YYYY hh:mm:ss A")}'}`
      ),
    });
    return {
      token: token,
    };
  } else {
    throw new AuthenticationError("Something went wrong");
  }
};
