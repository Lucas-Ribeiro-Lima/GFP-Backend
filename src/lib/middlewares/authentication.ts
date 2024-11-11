import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if(!req.isAuthenticated() || !req.user) {
    res.status(401).send()
    return
  }
  next()
}