import { DateTime } from 'luxon';
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm';
import User from './User';

export default class Expense extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public year: string;

  @column()
  public month: number;

  @column()
  public name: string;

  @column()
  public value: number;

  @column()
  public payment: string;

  @column()
  public category: string;

  @column()
  public installments: number;

  @column()
  public value_installment: number;

  @column()
  public status: boolean

  @column()
  public userId: number;

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user: BelongsTo<typeof User>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

}
