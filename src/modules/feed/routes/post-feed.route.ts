import { validateInput } from '../../../shared/infra/http/routes-handlers';
import { Route } from '../../../shared/domain';
import { FeedController } from '../controllers/feed.controller';

/**
 * PostFeedRoute Route Implementation
 */
export class PostFeedRoute extends Route {
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
    this.router.post(
      '/',
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
          required: ['date', 'header'],
        },
        {
          caseInsensitive: true,
          requestProperty: 'body',
        }
      ),
      this.#feedController.create()
    );
  }
}
