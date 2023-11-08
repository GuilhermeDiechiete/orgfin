
exports.up = function(knex) {
    return knex.schema.createTable('expenses', function(table) {
      table.increments('id').primary();
      table.decimal('amount').notNullable();
      table.integer('day').unsigned().notNullable();
      table.integer('month').unsigned().notNullable();
      table.integer('year').unsigned().notNullable();
      table.string('description', 50).notNullable();
      table.integer('payment_id').unsigned().notNullable();
      table.integer('user_id').unsigned().notNullable();
      table.integer('category_id').unsigned().notNullable();
      table.integer('installment_number').unsigned().notNullable();
      table.decimal('installment_amount').notNullable();
      table.boolean('status').notNullable();
      table.foreign('payment_id').references('payments.id');
      table.foreign('user_id').references('users.id');
      table.foreign('category_id').references('categories.id');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('expenses');
  };