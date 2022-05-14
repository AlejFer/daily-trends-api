import { ExternalSource } from "../models/feed";

export interface FeedCreateDto {
  description?: String;
  header: String;
  figure?: String;
  externalLink?: String;
  externalSource?: ExternalSource;
  date: Date;
}
