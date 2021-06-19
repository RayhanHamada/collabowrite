import { getModelForClass, prop } from '@typegoose/typegoose';

export class User {
  /**
   * @description user's name
   */
  @prop()
  public username!: string;

  /**
   * @description user's email
   */
  @prop()
  public email!: string;

  /**
   * @description user's online status
   */
  @prop({ required: true, enum: ['online', 'offline'] })
  public statusOnline!: 'online' | 'offline';
}

export const UserModel = getModelForClass(User);
