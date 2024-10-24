import { Request, Response, NextFunction } from "express";

export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if(!req.isAuthenticated()) {
    res.status(401).redirect("/auth/google")
    return
  }
  next()
}