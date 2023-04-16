import { type NextFunction, type Request, type Response } from 'express';

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(err); // Replace with a proper logging library
  res.status(500).send('Server error');
}
