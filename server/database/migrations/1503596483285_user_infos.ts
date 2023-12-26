import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'user_infos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');

      table.string('photo_url')
      table.string('full_name')
      table.text('description')
      table.string('profession')
      table.string('phone').unique()
      table.date('date_of_birth')
      table.enum('gender', ['Male', 'Female', 'Other']).defaultTo('Other')

      table.enu('role', ['admin', 'staff', 'operator', 'normal']).notNullable().defaultTo('normal')

      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })

      
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
