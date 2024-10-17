import { errorHandler } from "../../errors/errorHandler.ts";
import { NextFunction, Request, Response } from "express";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandlerHttp(err: Error, req: Request, res: Response, next: NextFunction) {
  const errRes = errorHandler(err)

  if(errRes) res.status(errRes.code).json({
    type: errRes.type,
    message: errRes.message
  })
}