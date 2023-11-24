
exports.up = function(knex) {
    return knex.schema.createTable('categories', function(table) {
      table.increments('id').primary();
      table.string('category_name').notNullable();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('categories');
  };
