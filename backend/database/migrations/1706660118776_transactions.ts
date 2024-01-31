import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'transactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      
      table.date('date').notNullable()
      table.string('type').notNullable()
      table.string('description').notNullable()
      table.decimal('amount',8,2).notNullable()
      table.integer('installment').unsigned()
      table.integer('total_installments').unsigned()
      table.string('category').defaultTo('normal')
      table.string('account').notNullable()
      table.string('destiny').notNullable()
      table.boolean('status').defaultTo(false)

      table.integer('user_id').unsigned().references('id').inTable('users').onUpdate('CASCADE').onDelete('CASCADE')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
