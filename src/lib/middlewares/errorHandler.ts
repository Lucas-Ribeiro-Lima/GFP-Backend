import { NextFunction, Request, Response } from "express";
import { AdapterRepoError, EntitieInstanceError, InvalidInputError, NotFoundError, UseCaseError } from '../../errors/customErrors.ts'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  if (err instanceof AdapterRepoError) res.status(500).json({
    type: "Repositorio",
    message: err.message
  })
  else if (err instanceof EntitieInstanceError) res.status(500).json({
    type: "Dominio",
    message: err.message
  })
  else if (err instanceof InvalidInputError) res.status(400).json({
    type: "Input inválido",
    message: err.message
  })
  else if (err instanceof NotFoundError) res.status(404).json({
    type: "Não encontrado",
    message: err.message
  })
  else if (err instanceof UseCaseError) res.status(500).json({
    type: "Casos de uso",
    message: err.message
  })
  else {
    res.status(500).json({
      type: "Erro não especificado",
      message: "Ocorreu um erro inesperado, por favor tente novamente mais tarde."
    })
  }
}