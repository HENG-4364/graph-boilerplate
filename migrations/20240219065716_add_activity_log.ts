import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("activity_log"))) {
    return await knex.schema.createTable("activity_log", (table) => {
      table.increments();
      table.json("activity");
      table.integer("admin_id");
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
