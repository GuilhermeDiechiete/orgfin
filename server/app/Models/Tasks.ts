import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import { User } from 'App/Models'

export default class Tasks extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public date: DateTime

  @column()
  public status: boolean

  @column()
  public name: string 

  @column()
  public description: string

  @column() 
  public userId: number 

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>
}