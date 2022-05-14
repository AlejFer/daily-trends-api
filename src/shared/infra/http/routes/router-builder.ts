import { Application } from 'express';
import { Route } from '../../../domain';
import { DefaultRoute } from './default-route';

export class RouterBuilder {
  private _routes: Array<Route>;

  constructor(routes: Array<Route>) {
    this._routes = [...routes, new DefaultRoute()];
  }

  public run(app: Application): void {
    this._routes.forEach((route: Route) => {
      route.build();
      app.use(`/${route.name}`, route.router);
    });
  }
}
