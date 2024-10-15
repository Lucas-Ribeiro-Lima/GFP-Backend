import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { InMemoryDespesas } from '../../adapters/repo/in-memory/inMemoryRegistros.ts'
import { Despesa } from '../../entities/Despesa.ts'
import { GerenciarDespesa } from '../gerenciarDespesa.ts'

describe("Teste para o caso de uso gerenciar Despesa [UC004] [UC005] [UC006]", () => {
  const repository = new InMemoryDespesas()
  const gerenciarDespesa = new GerenciarDespesa(repository)
  const arrayTeste: Despesa[] = []

  const despesa = new Despesa({
      uuid: randomUUID(),
      idCarteira: 1,
      categoria: 'moradia',
      competencia: {
        mes: 10,
        ano: 2024,
        dataInclusao: Date.now().toString(),
      },
      descricao: "Teste de despesa",
      numParcelas: 1,
      parcelado: false,
      modalidade: 'fixo',
      valor: 350
  })

  it("deve criar a despesa corretamente", async () => {
    await gerenciarDespesa.cadastrar(despesa)
    expect(await gerenciarDespesa.buscar(despesa.idCarteira)).toContainEqual(despesa)
  })

  it("deve cadastrar quantas despesas forem necessária para a mesma carteira", async () => {
    for(let i = 0; i < 10; i ++) {
      const despesa = new Despesa({
        uuid: randomUUID(),
        idCarteira: 1,
        categoria: 'moradia',
        competencia: {
          mes: 10,
          ano: 2024,
          dataInclusao: Date.now().toString(),
        },
        descricao: `Teste de despesa ${i}`,
        numParcelas: 1,
        parcelado: false,
        modalidade: 'fixo',
        valor: 350 * i
    })

    await gerenciarDespesa.cadastrar(despesa)
    arrayTeste.push(despesa)
    }

    expect(await gerenciarDespesa.buscar(despesa.idCarteira)).toEqual(expect.arrayContaining(arrayTeste))
  }) 
})