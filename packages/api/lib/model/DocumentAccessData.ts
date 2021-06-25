import { prop } from '@typegoose/typegoose';

export class DocumentAccessData {
  @prop()
  public docID!: string;

  @prop({ enum: ['edit', 'view'] as const })
  public accessRight!: 'edit' | 'view';

  @prop({ enum: ['owner', 'guest'] as const })
  public ownershipStatus!: 'owner' | 'guest';
}
