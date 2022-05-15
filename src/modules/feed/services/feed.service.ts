import { ID } from 'src/shared/domain';
import { FeedCreateDto } from '../dtos/feed-create.dto';
import { ExternalSource, IFeed } from '../models/feed';
import { FeedRepository } from '../repositories/feed.repository';

export class FeedService {
  #feedRepository: FeedRepository;

  constructor(feedRepository: FeedRepository) {
    this.#feedRepository = feedRepository;
  }

  async create(feed: FeedCreateDto): Promise<IFeed | null> {
    const externalSource = feed.externalSource || ExternalSource.NONE;
    return this.#feedRepository.save({
      ...feed,
      externalSource,
    });
  }

  async update(feed: FeedCreateDto, id: ID): Promise<IFeed | null> {
    return this.#feedRepository.save(
      {
        ...feed,
        id,
      },
      id
    );
  }

  async delete(id: ID): Promise<null> {
    return this.#feedRepository.delete(id);
  }

  async get(id: ID): Promise<IFeed | null> {
    return this.#feedRepository.getById(id);
  }

  async getTodayNoProviders(): Promise<IFeed[]> {
    const toDate = new Date();
    const fromDate = new Date(toDate);
    fromDate.setHours(0, 0, 0, 0);
    return this.#feedRepository.getByDateRangeNoProviders(fromDate, toDate);
  }

  async getAll(): Promise<IFeed[]> {
    return this.#feedRepository.getAll();
  }
}
