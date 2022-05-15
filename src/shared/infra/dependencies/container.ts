import { ILogger } from '../../domain/logger';
import config from '../../../config/Config';

import { FeedModule } from '../../../modules/feed/feed.module';
import { MongoDatasource } from '../datasource/mongodb.datasource';
import { RouterBuilder } from '../http/routes/router-builder';
import { WinstonLogger } from '../logger/winston.logger';

/**
 * Base dependencies definition
 */
export class Container {
  /** Logger */
  static logger: ILogger = new WinstonLogger(config.get('logger'));

  /** Datasource */
  static datasource: MongoDatasource = new MongoDatasource(
    config.get('mongo'),
    Container.logger
  );

  /** Application Modules */
  static feedModule: FeedModule = new FeedModule(Container.logger);

  /** Build Application Routes */
  static routerBuilder: RouterBuilder = new RouterBuilder([
    ...Container.feedModule.routes,
  ]);
}
