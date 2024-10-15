import { Request, Response } from 'express'
import { describe, expect, it, vi } from 'vitest'
import { GerenciarCarteira } from '../../../useCases/gerenciarCarteira.ts'
import { InMemoryCarteira } from '../../repo/in-memory/inMemoryCarteira.ts'
import { ControllerCarteira } from '../controllerCarteira.ts'
import { Carteira } from '../../../entities/Carteira.ts'

describe("Testes para o controller de carteira", () => {
  const repositorio = new InMemoryCarteira()
  const gerenciarCarteira = new GerenciarCarteira(repositorio)
  const controllerCarteira = new ControllerCarteira(gerenciarCarteira)

  const req = {
    params: { idDono: "0" }
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
    req.params.idDono = '1'
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

  it("não deve permitir criar duas carteiras para o mesmo dono", async () => {
    const carteiraDuplicada = new Carteira({
      id: 1,
      idContaDono: 1,
      nome: "Carteira duplicada",
      saldo: 0.00,
      compartilhada: false,
      idGrupoEconomico: null,
      meta: 0.00
    })

    req.body = carteiraDuplicada
    await controllerCarteira.handleHttpPost(req, res)

    expect(res.status).toBeCalledWith(500)
    expect(res.json).toBeCalledWith({error: "Esta conta já possui uma carteira vinculada"})
  })

  it("deve retornar um erro caso o id não seja um número válido", async () => {
    req.params.idDono = "A"

    await controllerCarteira.handleHttpGet(req, res)

    // Verificar se o status 404 foi chamado
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "Id inválido" });
  })

  it("deve retornar null caso a carteira não exista", async () => {
    // Mockando req e res
    const req = {
      params: { idDono: "0" }
    } as unknown as Request;

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    } as unknown as Response;

    await controllerCarteira.handleHttpGet(req, res);

    // Verificar se o status 404 foi chamado
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith(null);
  });

  it("deve deletar uma carteira corretamente", async () => {
    req.params.id = "1"

    await controllerCarteira.handleHttpDelete(req, res)

    expect(res.status).toHaveBeenCalledWith(204)
    expect(res.json).toHaveBeenCalledWith({message: "Carteira deletada com sucesso!"})
  })
});
