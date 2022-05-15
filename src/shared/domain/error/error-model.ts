/**
 * Error Model Abstraction
 */
export class ErrorModel extends Error {
  #statusMessage: string;
  #statusCode: number;

  /**
   * Constructor
   * @param statusMsg Default status message
   * @param statusCode Default status code
   * @param message Given error message
   */
  constructor(statusMsg: string, statusCode: number, message: string) {
    super(message);
    this.#statusMessage = statusMsg;
    this.#statusCode = statusCode;
  }

  /**
   * Get status message
   */
  get statusMessage(): string {
    return this.#statusMessage;
  }

  /**
   * get status code
   */
  get statusCode(): number {
    return this.#statusCode;
  }
}
