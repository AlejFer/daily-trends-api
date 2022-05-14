import { ErrorModel } from './error-model';

export class BadRequest extends ErrorModel {
  static readonly MSG = 'BAD REQUEST';

  static readonly CODE = 400;

  constructor(message: string) {
    super(BadRequest.MSG, BadRequest.CODE, message);
  }
}
