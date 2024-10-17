import { Request, Response, NextFunction } from "express";
import { appendFile } from "fs/promises"
import path from "path";

const logPath = path.join(path.dirname("./"), '..', 'backend', 'src', 'logs', 'error.log');

export async function logHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  const logLine = `Date: ${new Date().toISOString()} | Name: ${err.name} | Message: ${err.message} | Stack: ${err.stack}\n`;

  try {
    await appendFile(logPath, logLine);
  } catch (err) {
    next(err)
  }
  
  next(err)
}