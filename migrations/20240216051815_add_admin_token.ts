import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("admin_token"))) {
    return await knex.schema.createTable("admin_token", function (table) {
      table.increments();
      table.integer("admin_id");
      table.text("token", "longtext");
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
