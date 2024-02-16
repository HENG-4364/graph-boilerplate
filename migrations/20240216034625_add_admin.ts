import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("admins"))) {
    return await knex.schema.createTable("admins", function (table) {
      table.increments();
      table.string("profile");
      table.string("username");
      table.string("password");
      table.string("fullname");
      table.string("phone_number");
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
