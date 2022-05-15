import mongoose from 'mongoose';

/**
 * ExternalSource ENUM definition
 * [ EL_MUNDO | EL_PAIS | NONE ]
 */
export enum ExternalSource {
  EL_MUNDO = 'el-mundo',
  EL_PAIS = 'el-pais',
  NONE = 'none',
}

/**
 * IFeed interface
 */
export interface IFeed {
  id?: string;
  description?: string;
  header?: string;
  figure?: string;
  externalLink?: string;
  externalSource?: ExternalSource;
  date?: Date;
}

/**
 * Feed schema for mongoose
 */
export const FeedSchema = new mongoose.Schema<IFeed>({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  header: { type: String, required: true },
  externalSource: { type: String, required: true },
  description: { type: String, required: false },
  figure: { type: String, required: false },
  externalLink: { type: String, required: false },
});
