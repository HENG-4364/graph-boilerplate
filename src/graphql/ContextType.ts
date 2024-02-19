import { Request } from "express";
import { Knex } from "knex";
import { DecodedPayload } from "src/utils/jwt";
import createKnexContext from "./createKnexContext";

export default interface ContextType {
  knex: {
    default: Knex;
  };

  admin?: any;
  employee?: any;
  req: Request;
  decoded?: DecodedPayload;
  ip?: any;
}

export async function createContext({
  req,
}: {
  req: Request;
}): Promise<ContextType> {
  const knexConnectionList = createKnexContext();
  return {
    knex: knexConnectionList,
    req,
  };
}
