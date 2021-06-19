import { prop } from '@typegoose/typegoose';
import { Player } from './Player';

export class Room {
  @prop({ required: true })
  public documentID!: string;

  @prop({ required: true, type: [Player] })
  public playerList!: Player[];
}
