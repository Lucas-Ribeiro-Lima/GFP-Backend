import { NextFunction, Request, Response } from "express";

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

export function requiredtBodyProps(propriedades: Array<string>) {
  const propriedadesFaltantes: Array<string> = []
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const bodyPropriedades = Object.getOwnPropertyNames(req.body)

    propriedades.forEach((propriedade) => {
      if(!bodyPropriedades.includes(propriedade) && propriedade !== "constructor") propriedadesFaltantes.push(propriedade)
      })

    if(propriedadesFaltantes.length) {
      res.status(400).json({
      error: "Propriedades faltantes no corpo da requisição",
      propriedades: propriedadesFaltantes
      })
      return
    }
    next()
  }
}