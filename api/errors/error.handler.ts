import { ErrorRequestHandler } from 'express';
import { NotFoundError } from './not-found.error';
import { UnauthorizedError } from './unauthorized.error';

export const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  console.error(err.stack);
  if (err instanceof UnauthorizedError) {
    res.status(401).send('Unauthorized');
  } else if (err instanceof NotFoundError) {
    res.status(404).send('Not found');
  } else {
    res.status(500).send('Something went wrong. Try again later.');
  }
  next();
};
