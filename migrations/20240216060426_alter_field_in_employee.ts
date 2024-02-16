import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return await knex.schema.table("employee", function (table) {
    table.string("username");
    table.string("password");
  });
}

export async function down(knex: Knex): Promise<void> {}
