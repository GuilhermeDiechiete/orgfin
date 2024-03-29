import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

export default class Account extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  name: string 

  @column()
  amount: number

  @column() 
  public userId: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}
