import { NextFunction, Request, Response } from 'express'
import { describe, expect, it, vi } from 'vitest'
import { requiredBodyProps, requestBodyValido, requestParamsValido } from '../middlewares/validacoesHttp.ts'
import { carteiraSchema } from '../../adapters/zod/schemas/carteira.ts'

describe("Testes para as funções middleware para roteamento", () => {
  const req = {
    params: {},
    body: {}
  } as unknown as Request 

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response

  const next = vi.fn() as unknown as NextFunction

  const requiredPropsCarteira = requiredBodyProps(carteiraSchema)

  it("deve retornar status 400 caso a requisição não possua paramêtros", () => {
    requestParamsValido(req, res, next)
    expect(res.status).toHaveBeenCalledWith(400)
    expect(res.json).toHaveBeenCalledWith({ error: "Requisição sem parâmetros" })
  })

  it("deve chamar a função next caso a função possua paramêtros", () => {
    req.params.id = '0'

    requestParamsValido(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it("deve retornar status 400 caso a requisição não possua corpo", () => {
    requestBodyValido(req, res, next)

    expect(res.status).toBeCalledWith(400)
    expect(res.json).toBeCalledWith({error: "Requisição sem corpo"})
  })

  it("deve chamar a função next caso a função possua corpo", () => {
    req.body = {
      name: "john doe"
    }

    requestBodyValido(req, res, next)

    expect(next).toHaveBeenCalled()
  })

  it("deve retornar erro caso o corpo da requisição possua propriedades faltantes", () => {
    const carteira = {
      id: 0,
      nome: "John Doe",
      saldo: 10.0,
      idGrupoEconomico: null,
      meta: 0,
      compartilhada: false,
    }
    req.body = carteira

    expect(() => requiredPropsCarteira(req, res, next)).toThrowError()    
  })

  it("deve chamar a função next caso não haja propriedades faltantes", async () => {
    const carteira = {
      id: 0,
      idContaDono: 2,
      nome: "teste",
      idGrupoEconomico: null,
      saldo: 0,
      meta: 0,
      compartilhada: false,
    }
    req.body = carteira

    requiredPropsCarteira(req, res, next)

    expect(next).toBeCalled()
  })
})