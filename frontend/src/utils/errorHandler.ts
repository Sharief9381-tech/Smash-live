import { Response } from 'express';

export const handleError = (res: Response, error: any, statusCode = 500) => {
  console.error(`[Error]: ${error.message}`);
  return res.status(statusCode).json({
    success: false,
    message: error.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : error.stack
  });
};