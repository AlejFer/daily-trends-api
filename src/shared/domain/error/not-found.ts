import { ErrorModel } from './error-model';

export class NotFound extends ErrorModel {
  static readonly MSG = 'NOT FOUND';

  static readonly CODE = 404;

  constructor(message: string) {
    super(NotFound.MSG, NotFound.CODE, message);
  }
}
