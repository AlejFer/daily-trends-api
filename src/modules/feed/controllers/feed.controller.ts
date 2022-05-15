import { NextFunction, Request, Response } from 'express';
import {
  BadRequest,
  Handler,
  IScraper,
  NotFound,
} from '../../../shared/domain';
import { FeedDto } from '../dtos/feed.dto';
import { IFeed } from '../models/feed';
import { FeedService } from '../services/feed.service';

/**
 * FeedController Class Implementation
 */
export class FeedController {
  #feedService: FeedService;
  #scraperServices: IScraper<IFeed>[];

  /**
   * Constructor
   * @param feedService Feed service
   * @param scraperServices Feed providers services
   */
  constructor(feedService: FeedService, scraperServices: IScraper<IFeed>[]) {
    this.#feedService = feedService;
    this.#scraperServices = scraperServices;
  }

  /**
   * Create operation for Feed
   * @returns Handler
   */
  create(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const feed: FeedDto = req.body;
      try {
        if (feed.date && feed.header) {
          const newFeed = await this.#feedService.create(feed);
          res.send(newFeed).status(201);
        } else {
          throw new BadRequest('Date & Header are required fields');
        }
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Update operation for Feed
   * @returns Handler
   */
  update(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const feed: FeedDto = req.body;
      const { id } = req.params;
      try {
        const newFeed = await this.#feedService.update(feed, id);
        if (newFeed) {
          res.send(newFeed).status(200);
        } else {
          throw new NotFound(`Feed ${id} NOT FOUND`);
        }
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Delete operation for Feed
   * @returns Handler
   */
  delete(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const prevFeed = await this.#feedService.delete(id);
        if (prevFeed) {
          res.send().status(200);
        } else {
          throw new NotFound(`Feed ${id} NOT FOUND`);
        }
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Get operation for Feed by ID
   * @returns Handler
   */
  getById(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        const feed = await this.#feedService.get(id);
        if (feed) {
          res.send(feed).status(200);
        } else {
          throw new NotFound(`Feed ${id} NOT FOUND`);
        }
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Get Today Feeds
   * @returns Handler
   */
  getToday(): Handler {
    return async (_req: Request, res: Response, next: NextFunction) => {
      const feeds: IFeed[] = [];
      try {
        for (const service of this.#scraperServices) {
          feeds.push(...(await service.getContent()));
        }
        feeds.push(...(await this.#feedService.getTodayNoProviders()));
        res.send(feeds).status(200);
      } catch (error) {
        next(error);
      }
    };
  }

  /**
   * Get operation for Feed
   * @returns Handler
   */
  getAll(): Handler {
    return async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const feed = await this.#feedService.getAll();
        res.send(feed).status(200);
      } catch (error) {
        next(error);
      }
    };
  }
}
