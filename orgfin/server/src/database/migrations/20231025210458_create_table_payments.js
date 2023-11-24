
exports.up = function(knex) {
    return knex.schema.createTable('payments', function(table) {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable();
      table.foreign('user_id').references('users.id');
      table.string('payment_name').notNullable();
      table.string('description');
      table.decimal('limit').notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('payments');
  };
