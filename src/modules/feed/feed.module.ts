import { ILogger, IScraper, Route } from '../../shared/domain';
import { FeedController } from './controllers/feed.controller';
import { IFeed } from './models/feed';
import { FeedRepository } from './repositories/feed.repository';
import { DeleteFeedRoute } from './routes/delete-feed.route';
import { GetFeedRoute } from './routes/get-feed.route';
import { PatchFeedRoute } from './routes/patch-feed.route';
import { PostFeedRoute } from './routes/post-feed.route';
import { FeedProviderElMundoService } from './services/feed-provider-elmundo.service';
import { FeedProviderElPaisService } from './services/feed-provider-elpais.service';
import { FeedService } from './services/feed.service';

export class FeedModule {
  #controller: FeedController;
  #service: FeedService;
  #scraperServices: IScraper<IFeed>[];
  #repository: FeedRepository;
  #routes: Route[];
  constructor(logger: ILogger) {
    this.#repository = new FeedRepository();
    this.#service = new FeedService(this.#repository);
    this.#scraperServices = [
      new FeedProviderElMundoService(logger, this.#repository),
      new FeedProviderElPaisService(logger, this.#repository),
    ];
    this.#controller = new FeedController(this.#service, this.#scraperServices);
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
