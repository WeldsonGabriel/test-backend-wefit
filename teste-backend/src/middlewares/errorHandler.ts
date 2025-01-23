import { Request, Response, NextFunction } from 'express';
import { errorResponse } from '../utils/responses';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  return errorResponse(res, err, 'Erro interno do servidor.');
};

export default errorHandler;
