import { Application } from 'express';
import { Route } from '../../../domain';
import { DefaultRoute } from './default-route';

/**
 * RouterBuilder Class Implementation
 */
export class RouterBuilder {
  #routes: Array<Route>;

  /**
   * Constructor
   * @param routes Array of routes to add into service
   */
  constructor(routes: Array<Route>) {
    this.#routes = [...routes, new DefaultRoute()];
  }

  /**
   * Load routes into service
   * @param app Service
   */
  public run(app: Application): void {
    this.#routes.forEach((route: Route) => {
      route.build();
      app.use(`/${route.name}`, route.router);
    });
  }
}
