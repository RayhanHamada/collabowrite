import { getModelForClass, prop } from '@typegoose/typegoose';

import { DocumentAccessor } from './DocumentAccessor';

export class Document {
  /**
   * @description nama dokumen
   */
  @prop({ required: true })
  public name!: string;

  /**
   * @description konten dari dokumen
   */
  @prop({ required: true, type: Object })
  public content!: Record<string, unknown>;

  /**
   * @description kumpulan pengakses dokumen
   */
  @prop({ required: true, type: [DocumentAccessor] })
  public accessor!: DocumentAccessor[];

  /**
   * @description
   */
  @prop({ required: true })
  public currentRoomID!: string;
}

export const DocumentModel = getModelForClass(Document);
