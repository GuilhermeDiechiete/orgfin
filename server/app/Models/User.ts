import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import { Key, Category, Transaction, Account, Tasks } from 'App/Models'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public username: string

  @column()
  public email: string

  @column()
  public role: boolean

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

  @hasMany(() => Key)
  public keys: HasMany<typeof Key>

  @hasMany(() => Category)
  public categories: HasMany<typeof Category>

  @hasMany(() => Transaction)
  public transactions: HasMany<typeof Transaction>

  @hasMany(() => Account)
  public accounts: HasMany<typeof Account>

  @hasMany(() => Tasks)
  public tasks: HasMany<typeof Tasks>
}
