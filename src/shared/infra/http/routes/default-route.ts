import { NotFound, Route } from '../../../domain';

export class DefaultRoute extends Route {
  constructor() {
    super('');
  }

  build(): void {
    this.router.all('*', (_req, _res, next) => {
      next(new NotFound('Route Not Found'));
    });
  }
}
