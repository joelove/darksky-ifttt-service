exports.up = (knex, Promise) => (
  Promise.all([
    knex.schema.createTable('minutes', (table) => {
      table.uuid('id').notNullable().primary();
      table.integer('time').notNullable();
      table.decimal('precipIntensity').notNullable();
      table.decimal('precipProbability').notNullable();
      table.decimal('precipIntensityError');
      table.string('precipType');
    }),
  ])
);

exports.down = (knex) => {
  knex.schema.dropTable('minutes');
};
