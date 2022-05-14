import { Request, Response, NextFunction, Handler } from 'express';
import { ILogger } from '../../../domain';

export function RequestLoggerMiddleware(logger: ILogger): Handler {
  return (req: Request, _res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.path} Request`);
    next();
  };
}
