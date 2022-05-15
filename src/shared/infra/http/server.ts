import config from '../../../config/Config';

import express from 'express';
import { ErrorHandlerMiddleware } from './middlewares/error-handler-middleware';
import { Container } from '../dependencies/container';
import { RouterBuilder } from './routes/router-builder';
import { Datasource, ILogger } from 'src/shared/domain';
import { RequestLoggerMiddleware } from './middlewares/request-logger-middleware';
import { Mongoose } from '../datasource/mongodb.datasource';

/**
 * Server Class Implementation
 */
export class Server {
  #server: express.Application;
  #rBuilder: RouterBuilder;
  #datasource: Datasource<Mongoose>;
  #logger: ILogger;

  constructor() {
    this.#server = express();

    this.#server.use(express.json());
    this.#server.use(express.urlencoded({ extended: true }));

    this.#rBuilder = Container.routerBuilder;
    this.#datasource = Container.datasource;
    this.#logger = Container.logger;
  }

  /**
   * Initializes datasources, sets middlewares and builds routes
   */
  start() {
    this.#datasource.init();
    this.#server.use(RequestLoggerMiddleware(this.#logger));
    this.#rBuilder.run(this.#server);
    this.#server.use(ErrorHandlerMiddleware(this.#logger));

    this.#server.listen(config.get('server.port'), () => {
      this.#logger.info(`Listening at ${config.get('server.port')}`);
    });
  }
}
