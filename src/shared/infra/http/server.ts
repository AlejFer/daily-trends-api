import config from '../../../config/Config';

import express from 'express';
import { ErrorHandlerMiddleware } from './middlewares/error-handler-middleware';
import { Container } from '../dependencies/container';
import { RouterBuilder } from './routes/router-builder';
import { Datasource } from 'src/shared/domain/datasource';

export class Server {
  #server: express.Application;
  #rBuilder: RouterBuilder;
  #datasource: Datasource<any>;

  constructor(){
    this.#server = express();

    this.#server.use(express.json());
    this.#server.use(express.urlencoded({ extended: true }));

    this.#rBuilder = Container.routerBuilder;
    this.#datasource = Container.datasource;
  }

  start(){
    this.#datasource.init();
    this.#rBuilder.run(this.#server);
    this.#server.use(ErrorHandlerMiddleware);

    this.#server.listen(config.get('server.port'), () => {
        console.log(`Listening at ${config.get('server.port')}`);
    });
  }
}
