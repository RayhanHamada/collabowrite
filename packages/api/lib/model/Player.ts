import { prop } from '@typegoose/typegoose';

export class Player {
  /**
   * @description nama user
   */
  @prop()
  public username!: string;

  /**
   * @description warna cursor
   */
  @prop()
  public cursorColor!: string;

  /**
   * @description peerJS ID
   */
  @prop()
  public peerJSID!: string;

  /**
   * @description room master status
   */
  @prop()
  public isRM!: boolean;
}
