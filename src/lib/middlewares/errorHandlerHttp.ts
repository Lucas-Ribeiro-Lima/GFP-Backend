import { NextFunction, Request, Response } from "express";
import { errorHandler, ErrorResponse } from "../../errors/errorHandler.ts";
import { ZodError } from "zod";

function zodErrorHandler(err: Error): ErrorResponse | void {
  if(err instanceof ZodError) {
    return {
      code: 400,
      type: err.name,
      message: JSON.parse(err.message)
    }
  }
  return
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandlerHttp(err: Error, req: Request, res: Response, next: NextFunction) {
  const errRes = errorHandler(err, zodErrorHandler)

  if(errRes) res.status(errRes.code).json({
    type: errRes.type,
    message: errRes.message
  })
}