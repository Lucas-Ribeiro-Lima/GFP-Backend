import { describe, it, vi, expect } from 'vitest'
import { Request, Response } from 'express'
import { InMemoryRendas } from '../../repo/in-memory/inMemoryRegistros.ts'
import { GerenciarRenda } from '../../../useCases/gerenciarRenda.ts'
import { ControllerRenda } from '../controllerRenda.ts'
import { Renda } from '../../../entities/Renda.ts'
import { randomUUID } from 'crypto'

describe("Testes para o controller Http de renda", () => {
  const repositorio = new InMemoryRendas()
  const gerenciarRenda = new GerenciarRenda(repositorio)

  const controllerRenda = new ControllerRenda(gerenciarRenda)

  const req = {
    body: {
      idCarteira: 1
    }
  } as unknown as Request

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response

  //Gera um array de rendas
  const arrayRendas: Renda[] = []
  for(let i = 1; i <= 10; i++){
    const renda = new Renda({
      uuid: randomUUID(),
      idCarteira: 1,
      descricao: `Renda ${i}`,
      fonte: `Teste ${i}`,
      valor: 2100.0,
      categoria: 'salario',
      modalidade: 'fixo',
      frequencia: 'mensal',
      competencia: {
        mes: 10,
        ano: 2024,
        dataInclusao: Date.now().toString()
      }
    })

    arrayRendas.push(renda)
  }

  it("deve retornar um array vazio da carteira", async () => {
    await controllerRenda.handleHttpGet(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith([])
  })

  it("deve cadastrar um array de rendas para a carteira", () => {
    arrayRendas.forEach(async (renda) => {
      req.body.renda = renda
      await controllerRenda.handleHttpPost(req, res)

      expect(res.status).toBeCalledWith(201)
      expect(res.json).toBeCalledWith({message: "Renda cadastrada com sucesso"})
    })
  })

  it("deve retornar um array de rendas da carteira", async () => {
    await controllerRenda.handleHttpGet(req, res)

    expect(res.status).toBeCalledWith(200)
  })

  it("deve deletar a renda informada", async () => {
    req.body.uuid = arrayRendas[9].uuid

    await controllerRenda.handleHttpDelete(req, res)

    expect(res.status).toBeCalledWith(204)
  })

  it("não deve retornar a renda deletada", async () => {
    await controllerRenda.handleHttpGet(req, res)

    arrayRendas.pop()
    expect(res.status).toBeCalledWith(200)
  })
})