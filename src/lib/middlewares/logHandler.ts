import { Request, Response, NextFunction } from "express";
import { logger } from "../utils.ts";


export async function logHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message)
  next(err)
}