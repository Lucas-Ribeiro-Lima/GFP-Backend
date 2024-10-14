import { describe, expect, it } from 'vitest'
import { Carteira } from '../../entities/Carteira.ts'
import { InMemoryCarteira } from '../../repo/in-memory/inMemoryCarteira.ts'
import { GerenciarCarteira } from '../gerenciarCarteira.ts'

describe("Testes para o caso de uso gerenciar Carteira", () => {
  const repository = new InMemoryCarteira()
  const gerenciarCarteira = new GerenciarCarteira(repository)


  it("deve criar uma carteira corretamente", async () => {
    const carteira = new Carteira({
      id: 1,
      idContaDono: 1,
      nome: "Carteira 1",
      saldo: 0.00,
      compartilhada: false,
      idGrupoEconomico: null,
      meta: 0.00
    })

    await gerenciarCarteira.cadastrar(carteira)

    expect(gerenciarCarteira.buscar(1)).resolves.toBe(carteira)
  })

  it("deve criar varias carteiras corretamente", async () => {
    const array: Carteira[] = []

    for(let i = 2; i < 10; i++) {
      const carteira = new Carteira({
        id: i,
        idContaDono: i,
        nome: `Carteira teste ${i}`,
        compartilhada: false,
        meta: 2 * i,
        saldo: 10 * i,
        idGrupoEconomico: null
      })

      await gerenciarCarteira.cadastrar(carteira)
      array.push(carteira)
    }

    array.forEach(async (item) => {
      expect(gerenciarCarteira.buscar(item.idContaDono)).resolves.toBe(item)
    })
  })  

  it("deve atualizar a carteira corretamente", async () => {
    const carteira = await gerenciarCarteira.buscar(1)

    carteira.nome = "Carteira alterada"
    await gerenciarCarteira.atualizar(carteira)

    const carteiraAtualizada = await gerenciarCarteira.buscar(1)

    expect(carteiraAtualizada.nome).toBe("Carteira alterada")
  })
})