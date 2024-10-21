import { describe, expect, it } from 'vitest'
import { InMemoryCarteira } from '../../adapters/repo/in-memory/inMemoryCarteira.ts'
import { CarteiraProps } from '../../entities/Carteira.ts'
import { GerenciarCarteira } from '../gerenciarCarteira.ts'

describe("Testes para o caso de uso gerenciar Carteira", () => {
  const repository = new InMemoryCarteira()
  const gerenciarCarteira = new GerenciarCarteira(repository)


  it("deve criar uma carteira corretamente", async () => {
    const carteira = {
      id: 1,
      idContaDono: 1,
      nome: "Carteira 1",
      saldo: 0.00,
      compartilhada: false,
      idGrupoEconomico: null,
      meta: 0.00
    }

    await gerenciarCarteira.cadastrar(carteira)

    expect(gerenciarCarteira.buscar(1)).resolves.deep.contain(carteira)
  })

  it("deve criar varias carteiras corretamente", async () => {
    const array: CarteiraProps[] = []

    for(let i = 2; i < 10; i++) {
      const carteira = {
        id: i,
        idContaDono: i,
        nome: `Carteira teste ${i}`,
        compartilhada: false,
        meta: 2 * i,
        saldo: 10 * i,
        idGrupoEconomico: null
      }

      await gerenciarCarteira.cadastrar(carteira)
      array.push(carteira)
    }

    array.forEach(async (item) => {
      expect(gerenciarCarteira.buscar(item.idContaDono)).resolves.deep.contain(item)
    })
  })  

  it("deve atualizar a carteira corretamente", async () => {
    const carteira = {
      id: 1,
      idContaDono: 1,
      nome: "Carteira alterada",
      saldo: 0.00,
      compartilhada: false,
      idGrupoEconomico: null,
      meta: 0.00
    }

    await gerenciarCarteira.atualizar(carteira)

    const carteiraAtualizada = await gerenciarCarteira.buscar(1)
    if(!carteiraAtualizada) throw new Error("Carteira não encontrada")
    expect(carteiraAtualizada.nome).toBe("Carteira alterada")
  })

  it("deve retornar erro caso a carteira a atualizar não exista", async () => {
    const carteira = {
      id: 1,
      idContaDono: 12,
      nome: "Carteira 1",
      saldo: 0.00,
      compartilhada: false,
      idGrupoEconomico: null,
      meta: 0.00
    }

    expect(gerenciarCarteira.atualizar(carteira)).rejects.toThrowError()
  })

  it("não deve permitir criar duas carteiras para um mesmo dono", () => {
    const carteiraDuplicada = {
      id: 12,
      idContaDono: 1,
      nome: "Carteira 1",
      saldo: 0.00,
      compartilhada: false,
      idGrupoEconomico: null,
      meta: 0.00
    }

    expect(gerenciarCarteira.cadastrar(carteiraDuplicada)).rejects.toThrowError("Esta conta já possui uma carteira vinculada")
  })
})