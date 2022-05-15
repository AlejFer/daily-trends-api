import { NextFunction, Request, Response } from 'express';

/**
 * Middleware handler interface
 */
export interface Handler {
  (req: Request, res: Response, next: NextFunction): void;
}
