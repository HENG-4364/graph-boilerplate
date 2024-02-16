import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("roles"))) {
    return knex.schema.createTable("roles", (table) => {
      table.increments();
      table.string("roleName");     
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
