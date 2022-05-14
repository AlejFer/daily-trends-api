import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { FeedController } from '../controllers/feed.controller';

export class GetFeedRoute extends Route {
  #feedController: FeedController;

  constructor(feedController: FeedController) {
    super('feed');
    this.#feedController = feedController;
  }

  build(): void {
    this.router.get('/', this.#feedController.getAll());
    this.router.get('/today', this.#feedController.getToday());
    this.router.get(
      '/:id',
      validateInput(
        {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
          required: ['id'],
        },
        {
          caseInsensitive: true,
          requestProperty: 'params',
        }
      ),
      this.#feedController.getById()
    );
  }
}
