import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'expenses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('year').notNullable()
      table.string('month').notNullable()
      table.string('name').notNullable()
      table.decimal('value', 10, 2).unsigned().notNullable()
      table.string('payment')
      table.string('category').notNullable()
      table.integer('installments').unsigned().notNullable()
      table.decimal('value_installment', 10, 2).unsigned().notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  
  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
