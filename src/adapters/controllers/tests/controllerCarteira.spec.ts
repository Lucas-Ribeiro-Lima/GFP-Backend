import { InMemoryCarteira } from '../../repo/in-memory/inMemoryCarteira.ts'
import { GerenciarCarteira } from '../../../useCases/gerenciarCarteira.ts'
import { ControllerCarteira } from '../controllerCarteira.ts'
import { describe, expect, it, vi } from 'vitest'
import { Request, Response } from 'express'

describe("Testes para o controller de carteira", () => {
  const repositorio = new InMemoryCarteira()
  const gerenciarCarteira = new GerenciarCarteira(repositorio)
  const controllerCarteira = new ControllerCarteira(gerenciarCarteira)


  it("deve retornar um erro caso o id não seja um número válido", async () => {
    const req = {
      params: { idDono: "A"}
    } as unknown as Request

    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn().mockReturnThis()
    } as unknown as Response;

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
});
