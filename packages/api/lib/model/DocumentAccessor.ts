import { prop } from '@typegoose/typegoose';
import { User } from './User';

export class DocumentAccessor {
  @prop({ required: true, type: User })
  public user!: User;

  @prop({ required: true, enum: ['edit', 'view'] as const })
  public accessRight!: 'edit' | 'view';

  @prop({ required: true, enum: ['creator', 'guest'] as const })
  public propertyStatus!: 'creator' | 'guest';
}
