import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_incomes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

      table.string('year').notNullable().defaultTo(new Date().getFullYear().toString());
      table.integer('month').notNullable().unsigned().defaultTo(new Date().getMonth() + 1);
      
      table.string('workplace').notNullable()
      table.string('description').notNullable()
      
      table.decimal('value', 10, 2).unsigned().notNullable()
      table.date('date').notNullable()

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
