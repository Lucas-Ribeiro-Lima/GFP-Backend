import { NextFunction, Request, Response } from "express";

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

export function requestBodyFieldPresentes<T>(objeto: T,req: Request, res: Response, next: NextFunction): Response | void {
  const bodyPropriedades = Object.getOwnPropertyNames(req.body)
  const objetoPropriedades = Object.getOwnPropertyNames(objeto)
  const propriedadesFaltantes: Array<string> = []

  objetoPropriedades.forEach((propriedade) => {
    if(!bodyPropriedades.includes(propriedade) && propriedade !== "constructor") propriedadesFaltantes.push(propriedade)
  })

  if(propriedadesFaltantes.length) return res.status(400).json({
    error: "Propriedades faltantes no corpo da requisição",
    propriedades: propriedadesFaltantes
  })

  next()
}