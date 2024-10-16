import { Request, Response, NextFunction } from "express";

export function requestBodyValido(req: Request, res: Response, next: NextFunction): Response | void {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: "Requisição sem corpo" });
  }
  next();
}

export function requestParamsValido(req: Request, res: Response, next: NextFunction): Response | void {
  if (!req.params || Object.keys(req.params).length === 0) {
    return res.status(400).json({ error: "Requisição sem parâmetros" });
  }
  next();
}