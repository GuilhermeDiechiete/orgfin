
import { DateTime } from 'luxon'
import { BaseModel, column, BelongsTo, belongsTo } from '@ioc:Adonis/Lucid/Orm'
import UserAddress from 'App/Models/Address' 
import User from 'App/Models/User'

export default class Client extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public full_name: string

  @column()
  public photo_url: string

  @column()
  public phone: string

  @column()
  public date_of_birth: Date

  @column()
  public description: string

  @column()
  public profession: string

  @column()
  public gender: 'M' | 'F' | 'O'

  @column()
  public user_id: number;

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>;

  @column()
  public address_id: number

  @belongsTo(() => UserAddress, { foreignKey: 'address_id' })
  public address: BelongsTo<typeof UserAddress>

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updated_at: DateTime
}

