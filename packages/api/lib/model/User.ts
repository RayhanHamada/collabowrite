import { getModelForClass, prop } from '@typegoose/typegoose';
import { DocumentAccessData } from './DocumentAccessData';

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
   * @description status online user
   */
  @prop({ enum: ['online', 'offline'] })
  public onlineStatus!: 'online' | 'offline';

  /**
   * @description data akses dokumen
   */
  @prop({ type: () => [DocumentAccessData] })
  public documentAccessDatas!: DocumentAccessData[];
}

export const UserModel = getModelForClass(User);
