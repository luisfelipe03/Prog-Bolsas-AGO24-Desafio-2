import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err.message, { stack: err.stack });

  res.status(500).json({
    message: 'Ocorreu um erro interno no servidor',
    error: process.env.NODE_ENV === 'production' ? undefined : err.message, 
  });
};

export default errorHandler;
