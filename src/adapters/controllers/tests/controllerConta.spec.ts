import { Request, Response } from 'express'
import { describe, expect, it, vi } from 'vitest'
import { GerenciarConta } from '../../../useCases/gerenciarConta.ts'
import { InMemoryContas } from '../../repo/in-memory/inMemoryContas.ts'
import { ControllerConta } from '../http/controllerConta.ts'


describe("Testes para o controller Http de conta", () => {
  const repositorio = new InMemoryContas()
  const gerenciarConta = new GerenciarConta(repositorio)

  const controllerConta = new ControllerConta(gerenciarConta)

  const req = {
    user: {
      id: 0,
      email: "johndoe@doe.uk"
    },
    body: {}
  } as unknown as Request

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response

  const conta = {
    nome: "John Doe",
    cpf: "123456789-09",
    email: "johndoe@doe.uk",
  }


  it("deve retornar null caso a conta não exista", async () => {
    await controllerConta.handleHttpGet(req, res)
    expect(res.json).toBeCalledWith(null)
  })

  it("deve cadastrar um conta corretamente", async () => {

    req.body.conta = conta

    await controllerConta.handleHttpPost(req, res)

    expect(res.status).toBeCalledWith(201)
    expect(res.json).toBeCalledWith({message: "Conta criada com sucesso"})
  })

  it("deve recuperar uma conta cadastrada corretamente", async () => {
    await controllerConta.handleHttpGet(req, res)

    expect(res.status).toBeCalledWith(200)
  })

  it("deve atualizar um conta corretamente", async () => {
    req.body.nome = "Doe John"

    await controllerConta.handleHttpPatch(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({message: "Conta atualizada com sucesso"})
  })
  
  it("deve deletar um conta corretamente", async () => {
    req.body.email = "johndoe@doe.uk"

    await controllerConta.handleHttpDelete(req, res)

    expect(res.status).toBeCalledWith(204)
    expect(res.json).toBeCalledWith({message: "Conta excluída com sucesso"})
  })
})