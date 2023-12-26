import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'

import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Key from 'App/Models/Key'
import Category from './Category'
import Expense from './Expense'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken: string | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
  @hasMany(() => Category, { foreignKey: 'user_id' })
  public categories: HasMany<typeof Category>;
  
  

  @hasMany(() => Expense)
  public expenses: HasMany<typeof Expense>;

  @hasMany(() => Key)
  public keys: HasMany<typeof Key>
}
