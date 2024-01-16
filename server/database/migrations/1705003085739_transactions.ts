import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('month').notNullable().unsigned()
      table.integer('year').notNullable().unsigned()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.decimal('amount', 10, 2).notNullable()
      table.string('category', 50).notNullable()
      table.string('destiny', 50).notNullable()
      table.boolean('status').notNullable().defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
