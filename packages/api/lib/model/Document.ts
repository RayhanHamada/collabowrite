import { getModelForClass, prop } from '@typegoose/typegoose';

export class Document {
  /**
   * @description nama dokumen
   */
  @prop({ required: true })
  public name!: string;

  /**
   * @description konten dari dokumen
   */
  @prop({ required: true, type: () => Object })
  public content!: Record<string, unknown>;
}

export const DocumentModel = getModelForClass(Document);
