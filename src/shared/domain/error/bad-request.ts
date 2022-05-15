import { ErrorModel } from './error-model';

/**
 * BadRequest Error Implementation
 */
export class BadRequest extends ErrorModel {
  static readonly MSG = 'BAD REQUEST';

  static readonly CODE = 400;

  /**
   * Constructor
   * @param message Error message
   */
  constructor(message: string) {
    super(BadRequest.MSG, BadRequest.CODE, message);
  }
}
