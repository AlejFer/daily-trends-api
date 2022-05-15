import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { FeedController } from '../controllers/feed.controller';

/**
 * DeleteFeedRoute Route Implementation
 */
export class DeleteFeedRoute extends Route {
  #feedController: FeedController;

  /**
   * Constructor
   * @param feedController Controller
   */
  constructor(feedController: FeedController) {
    super('feed');
    this.#feedController = feedController;
  }

  build(): void {
    this.router.delete(
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
      this.#feedController.delete()
    );
  }
}
