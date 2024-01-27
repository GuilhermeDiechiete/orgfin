import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('day').notNullable()
      table.integer('month').notNullable()
      table.integer('year').notNullable()
      table.date('date').notNullable()
      
      table.string('description').notNullable().unique()
      table.string('installment').notNullable().unsigned()
      table.string('max_installment').notNullable().unsigned()
      table.decimal('amount', 10, 2).notNullable()

      table.string('type').notNullable()
      table.string('local', 50).notNullable()
      
      table.string('category', 50).notNullable()
      
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
