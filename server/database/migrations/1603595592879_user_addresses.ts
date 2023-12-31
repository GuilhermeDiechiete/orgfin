import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_addresses'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('user_infos').onDelete('CASCADE');

      table.string('street')
      table.string('number')
      table.string('city')
      table.string('state')
      table.string('postal_code')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
