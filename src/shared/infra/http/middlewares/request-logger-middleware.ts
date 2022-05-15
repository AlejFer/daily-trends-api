import { Request, Response, NextFunction, Handler } from 'express';
import { ILogger } from '../../../domain';

/**
 * Creates middleware to handle logging of incoming requests
 * @param logger Logger
 * @returns Middleware
 */
export function RequestLoggerMiddleware(logger: ILogger): Handler {
  return (req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path} Request`);
    next();
  };
}
