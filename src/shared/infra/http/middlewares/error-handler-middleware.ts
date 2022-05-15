import { Request, Response, NextFunction } from 'express';
import { ErrorModel, InternalServer, ILogger } from '../../../domain';

/**
 * Creates middleware to handle logging and response for unexpected errors
 * @param logger Logger
 * @returns Middleware
 */
export function ErrorHandlerMiddleware(logger: ILogger) {
  return (err: Error, _req: Request, res: Response, next: NextFunction) => {
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
      logger.error(
        `Error: ${response.statusMessage}. ${response.errorMessage}. Code: ${response.statusCode}. Request ${_req.path}.`
      );
      res.send(response).status(response.statusCode);
    }
    next();
  };
}
