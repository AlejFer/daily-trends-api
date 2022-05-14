import { Request, Response, NextFunction } from 'express';
import { ErrorModel, InternalServer } from '../../../domain';

export function ErrorHandlerMiddleware(err: Error, _req: Request, res: Response, next: NextFunction) {
  if (err) {
    let error: ErrorModel = err as ErrorModel;
    if (!error.statusCode) {
      error = new InternalServer(err.message);
    }
    const response = {
      statusCode: (error as ErrorModel).statusCode,
      statusMessage: (error as ErrorModel).statusMessage,
      errorMessage: error.message,
    };
    console.log(`Error: ${response.statusMessage}. ${response.errorMessage}. Code: ${response.statusCode}. Request ${_req.path}.`);
    res.send(response).status(response.statusCode);
  }
  next();
}
