import mongoose from 'mongoose';
import { BaseRepository, Repository, ID } from '../../../shared/domain';
import { ExternalSource, FeedSchema, IFeed } from '../models/feed';

/**
 * FeedRepository Class Implementation
 */
export class FeedRepository
  extends BaseRepository
  implements Repository<IFeed>
{
  #model: mongoose.Model<IFeed>;

  constructor() {
    super();
    this.#model = mongoose.model<IFeed>('Feed', FeedSchema);
  }

  async getById(id: ID): Promise<IFeed | null> {
    return this.#model.findOne({ id });
  }

  async save(value: IFeed, id?: ID | undefined): Promise<IFeed | null> {
    if (value) {
      if (!value.id && !id) {
        const id = this.generateID();
        value.id = id;
        const feed = await this.#model.create(value);
        return feed.save();
      }
      return this.#model.findOneAndUpdate(
        {
          id: value.id || id,
        },
        {
          $set: value,
        },
        { new: true }
      );
    }
    return null;
  }

  async getAll(): Promise<IFeed[]> {
    return this.#model.find();
  }

  /**
   * Looks for Feeds in the given range of dates and from internal source
   * @param datefrom From which date to look for
   * @param dateTo Until which date to look for
   * @returns Array of Feeds
   */
  async getByDateRangeNoProviders(
    datefrom: Date,
    dateTo: Date
  ): Promise<IFeed[]> {
    return this.#model.find({
      externalSource: ExternalSource.NONE,
      date: {
        $gte: datefrom,
        $lte: dateTo,
      },
    });
  }

  async delete(id: ID): Promise<IFeed | null> {
    return this.#model.findOneAndDelete({
      id,
    });
  }

  /**
   * Save Feed when it doesn't previously exists
   * @param value Feed to save
   * @returns Saved Feed
   */
  async validateAndSave(value: IFeed): Promise<IFeed | null> {
    if (value) {
      const dateTo = new Date();
      const datefrom = new Date(dateTo);
      datefrom.setHours(0, 0, 0, 0);
      const found = await this.#model.findOne({
        header: value.header,
        date: {
          $gte: datefrom,
          $lte: dateTo,
        },
      });
      if (!found) {
        const id = this.generateID();
        value.id = id;
        const feed = await this.#model.create(value);
        return feed.save();
      }
    }
    return null;
  }
}
