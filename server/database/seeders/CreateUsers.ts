import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  
  public async run () {
    await User.createMany([
      {
        username: 'admin',
        email: 'admin@gmail.com',
        password: '123456',
        role: 'admin'
      },

      {
        username: 'normal',
        email: 'normal@gmail.com',
        password: '123456',
        role: 'normal'
      }
    ])
  }
}
