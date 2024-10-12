import { describe, it, expect } from 'vitest'
import { InMemoryDespesas } from '../../repo/in-memory/inMemoryRegistros.ts'
import { GerenciarDespesa } from '../gerenciarDespesa.ts'
import { Despesa } from '../../entities/Despesa.ts'
import { randomUUID } from 'crypto'

describe("Teste para o caso de uso gerenciar Despesa [UC004] [UC005] [UC006]", () => {
  const repository = new InMemoryDespesas()
  const gerenciarDespesa = new GerenciarDespesa(repository)
  const arrayTeste: Despesa[] = []

  const despesa = new Despesa({
      uuid: randomUUID(),
      id_carteira: 1,
      categoria: 'moradia',
      competencia: {
        mes: 10,
        ano: 2024,
        dataInclusao: Date.now().toString(),
      },
      descricao: "Teste de despesa",
      numParcelas: 1,
      parcelado: false,
      tipo: 'fixo',
      valor: 350
  })

  it("deve criar a despesa corretamente", async () => {
    await gerenciarDespesa.cadastrar(despesa)
    expect(await gerenciarDespesa.loadDespesas(despesa.idCarteira)).toContainEqual(despesa)
  })

  it("deve cadastrar quantas despesas forem necessária para a mesma carteira", async () => {
    for(let i = 0; i < 10; i ++) {
      const despesa = new Despesa({
        uuid: randomUUID(),
        id_carteira: 1,
        categoria: 'moradia',
        competencia: {
          mes: 10,
          ano: 2024,
          dataInclusao: Date.now().toString(),
        },
        descricao: `Teste de despesa ${i}`,
        numParcelas: 1,
        parcelado: false,
        tipo: 'fixo',
        valor: 350 * i
    })

    await gerenciarDespesa.cadastrar(despesa)
    arrayTeste.push(despesa)
    }

    expect(await gerenciarDespesa.loadDespesas(despesa.idCarteira)).toEqual(expect.arrayContaining(arrayTeste))
  }) 
})