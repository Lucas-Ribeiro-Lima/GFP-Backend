import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { InMemoryDespesas } from '../../adapters/repo/in-memory/inMemoryRegistros.ts'
import { Despesa, DespesaProps } from '../../entities/Despesa.ts'
import { GerenciarDespesa } from '../gerenciarDespesa.ts'

describe("Teste para o caso de uso gerenciar Despesa [UC004] [UC005] [UC006]", async () => {
  const repository = new InMemoryDespesas()
  const gerenciarDespesa = new GerenciarDespesa(repository)
  const arrayTeste: DespesaProps[] = []

  for(let i = 0; i < 4; i ++) {
    const despesa: DespesaProps = {
      uuid: randomUUID(),
      idCarteira: 1,
      modalidade: 'fixo',
      categoria: 'moradia',
      descricao: `Teste de despesa ${i}`,
      valor: 350 * i,
      parcelado: false,
      numParcelas: 1,
      competencia: {
        mes: 10,
        ano: 2024,
        dataInclusao: Date.now().toString(),
      },
    }
    await gerenciarDespesa.cadastrar(despesa)
    arrayTeste.push(new Despesa(despesa).allProps)
  }
  it("deve cadastrar quantas despesas forem necessária para a mesma carteira", async () => {
    expect(await gerenciarDespesa.buscar(1)).toStrictEqual(arrayTeste)
  }) 
})