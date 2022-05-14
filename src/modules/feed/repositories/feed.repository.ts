import mongoose from 'mongoose';
import { BaseRepository, Repository, ID } from '../../../shared/domain';
import { FeedSchema, IFeed } from '../models/feed';

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

  async getByDateRange(datefrom: Date, dateTo: Date): Promise<IFeed[]> {
    return this.#model.find({
      date: {
        $gte: datefrom,
        $lte: dateTo,
      },
    });
  }

  async delete(id: ID): Promise<null> {
    return this.#model.findOneAndDelete({
      id,
    });
  }
}
