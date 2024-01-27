import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public day: number

  @column()
  public month: number

  @column()
  public date: Date
  
  @column()
  public year: number
  
  @column()
  public description: string

  @column()
  public installment: number 

  @column()
  public max_installment: number 

  @column({ serializeAs: 'amount' })
  public amount: number

  @column()
  public type: string

  @column()
  public local: string

  @column()
  public category: string

  @column()
  public status: boolean

  @column({ columnName: 'user_id' })
  public userId: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
