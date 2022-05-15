import { ID } from 'src/shared/domain';
import { FeedDto } from '../dtos/feed.dto';
import { ExternalSource, IFeed } from '../models/feed';
import { FeedRepository } from '../repositories/feed.repository';

/**
 * FeedService Class Implementation
 */
export class FeedService {
  #feedRepository: FeedRepository;

  /**
   * Constructor
   * @param feedRepository Feed Repository
   */
  constructor(feedRepository: FeedRepository) {
    this.#feedRepository = feedRepository;
  }

  /**
   * Creates Feed
   * @param feed Feed to create
   * @returns Created Feed
   */
  async create(feed: FeedDto): Promise<IFeed | null> {
    const externalSource = feed.externalSource || ExternalSource.NONE;
    return this.#feedRepository.save({
      ...feed,
      externalSource,
    });
  }

  /**
   * Updates Feed
   * @param feed Feed data to update
   * @param id Feed identifier to look for
   * @returns Updated Feed
   */
  async update(feed: FeedDto, id: ID): Promise<IFeed | null> {
    return this.#feedRepository.save(
      {
        ...feed,
        id,
      },
      id
    );
  }

  /**
   * Deletes Feed
   * @param id Feed identifier to look for
   * @returns null
   */
  async delete(id: ID): Promise<IFeed | null> {
    return this.#feedRepository.delete(id);
  }

  /**
   * Looks for requested Feed
   * @param id Feed identifier to look for
   * @returns Requested Feed
   */
  async get(id: ID): Promise<IFeed | null> {
    return this.#feedRepository.getById(id);
  }

  /**
   * Looks for the Feeds of the current day that belongs to no external source
   * @returns Array of Feeds
   */
  async getTodayNoProviders(): Promise<IFeed[]> {
    const toDate = new Date();
    const fromDate = new Date(toDate);
    fromDate.setHours(0, 0, 0, 0);
    return this.#feedRepository.getByDateRangeNoProviders(fromDate, toDate);
  }

  /**
   * Looks for all stored Feeds
   * @returns Array of Feeds
   */
  async getAll(): Promise<IFeed[]> {
    return this.#feedRepository.getAll();
  }
}
