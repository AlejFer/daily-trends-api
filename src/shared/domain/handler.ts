import { NextFunction, Request, Response } from 'express';

export interface Handler {
  (req: Request, res: Response, next: NextFunction): void;
}
