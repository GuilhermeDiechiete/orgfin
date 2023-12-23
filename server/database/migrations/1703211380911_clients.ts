import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {

      table.increments('id')
      table.string('full_name').notNullable()
      table.string('photo_url')
      table.string('phone').notNullable()
      table.date('date_of_birth').notNullable()
      table.text('description')
      table.string('profession')
      table.enum('gender', ['M', 'F', 'O']).notNullable()
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.integer('address_id').unsigned().references('id').inTable('user_addresses').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
