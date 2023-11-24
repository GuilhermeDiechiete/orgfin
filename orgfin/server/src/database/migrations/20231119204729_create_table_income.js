
exports.up = function(knex) {
    return knex.schema.createTable('income', function(table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.foreign('user_id').references('users.id');
        table.string('description');
        table.integer('day').unsigned().notNullable();
        table.integer('month').unsigned().notNullable();
        table.integer('year').unsigned().notNullable();
        table.decimal('income_value', 10, 2).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('income');
  };
