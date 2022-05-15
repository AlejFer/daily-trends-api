import { ErrorModel } from './error-model';

/**
 * NotFound Error Implementation
 */
export class NotFound extends ErrorModel {
  static readonly MSG = 'NOT FOUND';

  static readonly CODE = 404;

  /**
   * Constructor
   * @param message Error message
   */
  constructor(message: string) {
    super(NotFound.MSG, NotFound.CODE, message);
  }
}
