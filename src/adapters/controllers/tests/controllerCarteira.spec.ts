import { Request, Response } from 'express'
import { describe, expect, it, vi } from 'vitest'
import { Carteira } from '../../../entities/Carteira.ts'
import { GerenciarCarteira } from '../../../useCases/gerenciarCarteira.ts'
import { InMemoryCarteira } from '../../repo/in-memory/inMemoryCarteira.ts'
import { ControllerCarteira } from '../controllerCarteira.ts'

describe("Testes para o controller de carteira", () => {
  const repositorio = new InMemoryCarteira()
  const gerenciarCarteira = new GerenciarCarteira(repositorio)
  const controllerCarteira = new ControllerCarteira(gerenciarCarteira)

  const req = {
    params: { idContaDono: "0" }
  } as unknown as Request;

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response;

  const carteira = new Carteira({
    id: 1,
    idContaDono: 1,
    nome: "Carteira 1",
    saldo: 0.00,
    compartilhada: false,
    idGrupoEconomico: null,
    meta: 0.00
  })
  it("deve criar uma carteira corretamente", async () => {
    req.body = carteira

    await controllerCarteira.handleHttpPost(req, res)

    expect(res.status).toBeCalledWith(201)
    expect(res.json).toBeCalledWith({message: "Carteira criada com sucesso!"})
  })

  it("deve retornar uma carteira corretamente", async () => {
    req.params.idContaDono = '1'
    await controllerCarteira.handleHttpGet(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith(carteira)
  })

  it("deve atualizar a carteira corretamente", async () => {
    const carteira = new Carteira({
      id: 1,
      idContaDono: 1,
      nome: "Carteira 1",
      saldo: 0.00,
      compartilhada: false,
      idGrupoEconomico: null,
      meta: 0.00
    })

    req.body = carteira

    await controllerCarteira.handleHttpPatch(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith({message: "Carteira atualizada com sucesso!"})
  })

  it("deve deletar uma carteira corretamente", async () => {
    req.params.id = "1"

    await controllerCarteira.handleHttpDelete(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.json).toHaveBeenCalledWith({message: "Carteira deletada com sucesso!"})
  })

  
  it("deve retornar null caso a carteira não exista", async () => {
    req.params.idContaDono = "0"

    await controllerCarteira.handleHttpGet(req, res)
    expect(res.json).toBeCalledWith(null)
  });
});
