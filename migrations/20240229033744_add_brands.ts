import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  if (!(await knex.schema.hasTable("brands"))) {
    return await knex.schema.createTable("brands", (table) => {
      table.increments();
      table.string("brand_image");
      table.string("brand_name");   
      table.timestamps(true, true);
    });
  }
}

export async function down(knex: Knex): Promise<void> {}
