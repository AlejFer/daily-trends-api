import { NextFunction, Request, Response } from 'express';
import { BadRequest, Handler, NotFound } from '../../../shared/domain';
import { FeedCreateDto } from '../dtos/feed-create.dto';
import { FeedService } from '../services/feed.service';

export class FeedController {
  #feedService: FeedService;

  constructor(feedService: FeedService) {
    this.#feedService = feedService;
  }

  create(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const feed: FeedCreateDto = req.body;
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

  update(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const feed: FeedCreateDto = req.body;
      const { id } = req.params;
      try {
        const newFeed = await this.#feedService.update(feed, id);
        res.send(newFeed).status(200);
      } catch (error) {
        next(error);
      }
    };
  }

  delete(): Handler {
    return async (req: Request, res: Response, next: NextFunction) => {
      const { id } = req.params;
      try {
        await this.#feedService.delete(id);
        res.send().status(200);
      } catch (error) {
        next(error);
      }
    };
  }

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

  getToday(): Handler {
    return async (_req: Request, res: Response, next: NextFunction) => {
      try {
        const feed = await this.#feedService.getToday();
        res.send(feed).status(200);
      } catch (error) {
        next(error);
      }
    };
  }

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
