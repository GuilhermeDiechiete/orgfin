import { DateTime } from 'luxon';
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm';
import User from './User';
import UserAddress from './UserAddress';

export default class UserInfo extends BaseModel {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public photo_url: string;

  @column()
  public full_name: string;

  @column()
  public description: string;

  @column()
  public profession: string;

  @column()
  public phone: string;

  @column()
  public date_of_birth: Date;

  @column()
  public gender: 'Male' | 'Female' | 'Other';

  @column()
  public role: 'admin' | 'staff' | 'operator' | 'normal';

  @column()
  public user_id: number;

  @hasOne(() => User, {
    localKey: 'user_id',
    foreignKey: 'id',
  })
  public user: HasOne<typeof User>;

  @column()
  public address_id: number;

  @hasOne(() => UserAddress, {
    localKey: 'user_id',
    foreignKey: 'user_id',
  })
  public address: HasOne<typeof UserAddress>;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;
}
