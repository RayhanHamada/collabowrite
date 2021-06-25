import { prop } from '@typegoose/typegoose';
import { Player } from './Player';

export class Room {
  @prop()
  public docID!: string;

  @prop({ type: () => [Player] })
  public playerList!: Player[];
}
