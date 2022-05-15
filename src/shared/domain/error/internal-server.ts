import { ErrorModel } from './error-model';

/**
 * InternalServer Error Implementation
 */
export class InternalServer extends ErrorModel {
  static readonly MSG = 'INTERNAL SERVER ERROR';

  static readonly CODE = 500;

  /**
   * Constructor
   * @param message Error message
   */
  constructor(message: string) {
    super(InternalServer.MSG, InternalServer.CODE, message);
  }
}
