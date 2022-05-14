import { Route } from '../../shared/domain';
import { FeedController } from './controllers/feed.controller';
import { FeedRepository } from './repositories/feed.repository';
import { DeleteFeedRoute } from './routes/delete-feed.route';
import { GetFeedRoute } from './routes/get-feed.route';
import { PatchFeedRoute } from './routes/patch-feed.route';
import { PostFeedRoute } from './routes/post-feed.route';
import { FeedService } from './services/feed.service';

export class FeedModule {
  #controller: FeedController;
  #service: FeedService;
  #repository: FeedRepository;
  #routes: Route[];
  constructor() {
    this.#repository = new FeedRepository();
    this.#service = new FeedService(this.#repository);
    this.#controller = new FeedController(this.#service);
    this.#routes = [
      new PostFeedRoute(this.controller),
      new GetFeedRoute(this.controller),
      new PatchFeedRoute(this.controller),
      new DeleteFeedRoute(this.#controller),
    ];
  }

  get routes(): Route[] {
    return this.#routes;
  }

  get repository(): FeedRepository {
    return this.#repository;
  }

  get controller(): FeedController {
    return this.#controller;
  }

  get service(): FeedService {
    return this.#service;
  }
}
