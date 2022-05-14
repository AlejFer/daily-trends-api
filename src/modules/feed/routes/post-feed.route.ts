import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { FeedController } from '../controllers/feed.controller';

export class PostFeedRoute extends Route {
  #feedController: FeedController;

  constructor(feedController: FeedController) {
    super('feed');
    this.#feedController = feedController;
  }

  build(): void {
    this.router.post('/', validateInput({
      type: 'object',
      properties: {
          coordinates: { type: 'string' },
      },
      required: [],
    }, {
      caseInsensitive: true,
      requestProperty: 'body',
    }), this.#feedController.create());
  }
}
