import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("employee"))) {
    return knex.schema.createTable("employee", (table) => {
      table.increments();
      table.string("firstname");
      table.string("lastname");
      table.string("gender");
      table.string("tel");
      table.string("email");
      table.string("address");
      table.string("country");
      table.timestamps(true, true);
    });
  }
}


export async function down(knex: Knex): Promise<void> {
}

