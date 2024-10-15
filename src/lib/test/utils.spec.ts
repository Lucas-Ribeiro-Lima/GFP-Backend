import { describe, expect, it, vi} from 'vitest'
import { cpfValido, emailValido, requestBodyValido, requestParamsValido} from '../utils.ts'  
import { Request, Response, NextFunction } from 'express'

describe("Testes para as funções utilitárias", () => {  
  it("deve retornar verdadeiro para o cpf válido", () => {
    const cpf_valido = '123456789-09'
    const cpf_valido2 = '12345678909'
    expect(cpfValido(cpf_valido)).toBeTruthy()
    expect(cpfValido(cpf_valido2)).toBeTruthy()
  })
  
  it("deve retornar falso para o cpf inválido", () => {
    const cpf_invalido = '111111111-11'
    const cpf_invalido2 = '24982523898'
    expect(cpfValido(cpf_invalido)).toBeFalsy()
    expect(cpfValido(cpf_invalido2)).toBeFalsy()
  })
  
  it("deve retornar verdadeiro para o e-mail válido", () => {
    const email_valido = 'foo-bar@bar.uk'
    const email_valido2 = 'foobar@bar.org.uk'
    expect(emailValido(email_valido)).toBeTruthy()
    expect(emailValido(email_valido2)).toBeTruthy()
  })

  it("deve retornar falso para o e-mail inválido", () => {
    const email_invalido = 'foo@bar'
    const email_invalido2 = 'foobarbar.org.uk'
    expect(emailValido(email_invalido)).toBeFalsy()
    expect(emailValido(email_invalido2)).toBeFalsy()
  })
})

describe("Testes para as funções middleware para roteamente", () => {
  const req = {
    params: {},
    body: {}
  } as unknown as Request 

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response

  const next = vi.fn() as unknown as NextFunction

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
})