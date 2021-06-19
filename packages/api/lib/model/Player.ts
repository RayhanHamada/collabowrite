import { prop } from '@typegoose/typegoose';
import { User } from './User';

export class Player {
  /**
   * @description user
   */
  @prop({ required: true, type: User })
  public user!: User;

  /**
   * @description room master status
   */
  @prop({ required: true })
  public rmStatus!: boolean;
}
