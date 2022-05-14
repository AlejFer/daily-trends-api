import mongoose from "mongoose";

export enum ExternalSource {
  EL_MUNDO = 'el-mundo',
  EL_PAIS = 'el-pais',
  NONE = 'none',
};

export interface IFeed {
  id?: String;
  description?: String;
  header?: String;
  figure?: String;
  externalLink?: String;
  externalSource?: ExternalSource;
  date?: Date;
};

export const FeedSchema = new mongoose.Schema<IFeed>({
  id: { type: String, required: true },
  date: { type: Date, required: true },
  header: { type: String, required: true },
  externalSource: { type: String, required: true },
  description: { type: String, required: false },
  figure: { type: String, required: false },
  externalLink: { type: String, required: false },
});
