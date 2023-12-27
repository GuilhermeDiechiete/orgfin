import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('year').notNullable().defaultTo(new Date().getFullYear().toString());
      table.integer('month').notNullable().unsigned().defaultTo(new Date().getMonth() + 1);
      table.string('name').notNullable()
      table.decimal('value', 10, 2).unsigned().notNullable()
      table.string('payment')
      table.string('category').notNullable()
      table.integer('installments').unsigned().notNullable().defaultTo(1)
      table.decimal('value_installment', 10, 2).unsigned().notNullable()
      table.boolean('status').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
