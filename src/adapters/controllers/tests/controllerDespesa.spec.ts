import { GerenciarDespesa } from '../../../useCases/gerenciarDespesa.ts'
import { InMemoryDespesas } from '../../repo/in-memory/inMemoryRegistros.ts'
import { ControllerDespesa } from '../controllerDespesa.ts'
import { describe, expect, it, vi } from 'vitest'
import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import { Despesa } from '../../../entities/Despesa.ts'


describe("Testes para o controller Http de despesas", () => {
  const repositorio = new InMemoryDespesas()
  const gerenciarDespesas = new GerenciarDespesa(repositorio)

  const controllerDespesas = new ControllerDespesa(gerenciarDespesas)

  const req = {
    body: {
      idCarteira: 1
    }
  } as unknown as Request

  const res = {
    status: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis()
  } as unknown as Response
  
  //Gera um array de despesas de 10 elementos
  const arrayDespesas: Despesa[] = []
  for(let i = 1; i <= 10; i++) {
    const despesa = new Despesa({
      uuid: randomUUID(),
      idCarteira: 1,
      valor: 570.20 * i,
      descricao: `Item ${i}`,
      modalidade: 'variavel',
      categoria: 'outros',
      parcelado: false,
      numParcelas: 1,
      competencia: {
        mes: 10,
        ano: 2024,
        dataInclusao: Date.now().toString()
      },
    })

    arrayDespesas.push(despesa)
  }

  it("deve retornar um array vazio caso não existam despesas", async () => {
    await controllerDespesas.handleHttpGet(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith([])
  })

  it("deve cadastrar despesas corretamente", () => {
    arrayDespesas.forEach(async (despesa) => {
      req.body.despesa = despesa
      await controllerDespesas.handleHttpPost(req, res)
  
      expect(res.status).toBeCalledWith(201)
      expect(res.json).toBeCalledWith({message: "Despesa criada com sucesso"})
    })
  })

  it("deve retornar todas as despesas de uma carteira", async () => {
    await controllerDespesas.handleHttpGet(req, res)

    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith(arrayDespesas)
  })

  it("deve deletar uma despesa corretamente", async () => {
    req.body.uuid = arrayDespesas[9].uuid

    await controllerDespesas.handleHttpDelete(req, res)

    expect(res.status).toBeCalledWith(204)
    expect(res.json).toBeCalledWith({message: "Despesa excluida com sucesso"})
  })

  it("não deve retornar a despesa deletada", async () => {
    await controllerDespesas.handleHttpGet(req, res)

    arrayDespesas.pop()
    expect(res.status).toBeCalledWith(200)
    expect(res.json).toBeCalledWith(arrayDespesas)
  })
})