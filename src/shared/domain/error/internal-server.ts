import { ErrorModel } from './error-model';

export class InternalServer extends ErrorModel {
  static readonly MSG = 'INTERNAL SERVER ERROR';

  static readonly CODE = 500;

  constructor(message: string) {
    super(InternalServer.MSG, InternalServer.CODE, message);
  }
}
