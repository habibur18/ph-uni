import { NextFunction, Request, Response } from 'express'
import { NOT_FOUND } from 'http-status'

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(NOT_FOUND).json({
    success: false,
    message:
      'You have requested a resource that does not exist or it is not available',
    error: '',
  })
}

export default notFound
