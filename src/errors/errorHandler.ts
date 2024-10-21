import { AdapterRepoError, EntitieInstanceError, InvalidInputError, NotFoundError, UseCaseError } from "./customErrors.ts"

export type ErrorResponse = {
  code: number,
  type: string,
  message: string
}

export function errorHandler(err: Error, extendedHandler?: (err: Error) => ErrorResponse | void): ErrorResponse {
  if (err instanceof AdapterRepoError) return {
    code: 500,
    type: "Repositorio",
    message: err.message
  }
  else if (err instanceof EntitieInstanceError) return {
    code: 500,
    type: "Dominio",
    message: err.message
  }
  else if (err instanceof InvalidInputError) return {
    code: 400,
    type: "Input inválido",
    message: err.message
  }
  else if (err instanceof NotFoundError) return {
    code: 404,
    type: "Não encontrado",
    message: err.message
  }
  else if (err instanceof UseCaseError) return {
    code: 500,
    type: "Casos de uso",
    message: err.message
  }
  else {
    const extendedResponse = extendedHandler?.(err);
    if (extendedResponse) {
      return extendedResponse;
    }
    return {
      code: 500,
      type: "Erro não especificado",
      message: "Ocorreu um erro inesperado, por favor tente novamente mais tarde."
    }
  }
}