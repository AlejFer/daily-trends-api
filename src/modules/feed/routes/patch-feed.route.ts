import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { FeedController } from '../controllers/feed.controller';

export class PatchFeedRoute extends Route {
  #feedController: FeedController;

  constructor(feedController: FeedController) {
    super('feed');
    this.#feedController = feedController;
  }

  build(): void {
    this.router.patch(
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
      this.#feedController.update()
    );
  }
}
