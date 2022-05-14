export class ErrorModel extends Error {
  private _statusMessage: string;

  private _statusCode: number;

  constructor(statusMsg: string, statusCode: number, message: string) {
    super(message);
    this._statusMessage = statusMsg;
    this._statusCode = statusCode;
  }

  get statusMessage(): string {
    return this._statusMessage;
  }

  get statusCode(): number {
    return this._statusCode;
  }
}
