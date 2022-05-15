import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { FeedController } from '../controllers/feed.controller';

/**
 * PatchFeedRoute Route Implementation
 */
export class PatchFeedRoute extends Route {
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
      validateInput(
        {
          type: 'object',
          properties: {
            description: { type: 'string' },
            header: { type: 'string' },
            figure: { type: 'string' },
            externalLink: { type: 'string' },
            externalSource: { type: 'string' },
            date: { type: 'string' },
          },
          required: [],
        },
        {
          caseInsensitive: true,
          requestProperty: 'body',
        }
      ),
      this.#feedController.update()
    );
  }
}
