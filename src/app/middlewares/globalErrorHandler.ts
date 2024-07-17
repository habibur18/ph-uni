import { Request, Response, NextFunction } from 'express'
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500 // eslint-disable-line
  let message = err.message || 'something went wrong' // eslint-disable-line
  return res.status(statusCode).json({
    success: false,
    message: message,
    error: err,
  })
}

export default globalErrorHandler
