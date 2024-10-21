import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";

export async function requestBodyValido(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.body || Object.keys(req.body).length === 0) {
    res.status(400).json({ error: "Requisição sem corpo" });
    return
  }
  next();
}

export async function requestParamsValido(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.params || Object.keys(req.params).length === 0) {
    res.status(400).json({ error: "Requisição sem parâmetros" });
    return
  }
  next();
}

export async function requestQueryValido(req: Request, res: Response, next: NextFunction): Promise<void> {
  if (!req.query || Object.keys(req.query).length === 0) {
    res.status(400).json({ error: "Requisição sem parâmetros" });
    return
  }
  next();
}

export function requiredBodyProps(schema: ZodSchema, chave?: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if(chave && !req.body[chave]) {
      res.status(400).json({error: `Propriedade ${chave} faltando no corpo da requisição`})
      return
    }
    schema.parse((chave) ? req.body[chave] : req.body)
    next()
  }
}