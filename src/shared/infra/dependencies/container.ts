import config from '../../../config/Config';

import { FeedModule } from '../../../modules/feed/feed.module';
import { MongoDatasource } from '../datasource/mongodb.datasource';
import { RouterBuilder } from '../http/routes/router-builder';

export class Container {
  /** Datasource */
  static datasource: MongoDatasource = new MongoDatasource(config.get('mongo'));

  /** Application Modules */
  static feedModule: FeedModule = new FeedModule();

  /** Build Application Routes */
  static routerBuilder: RouterBuilder = new RouterBuilder(
    [...Container.feedModule.routes]
  );
}
