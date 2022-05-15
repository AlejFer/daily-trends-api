import { ExternalSource } from '../models/feed';

/**
 * Feed DTO
 */
export interface FeedDto {
  description?: string;
  header: string;
  figure?: string;
  externalLink?: string;
  externalSource?: ExternalSource;
  date: Date;
}
