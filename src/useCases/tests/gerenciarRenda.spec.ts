import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { InMemoryRendas } from '../../adapters/repo/in-memory/inMemoryRegistros.ts'
import { Renda, RendaProps } from '../../entities/Renda.ts'
import { GerenciarRenda } from '../gerenciarRenda.ts'

describe("Teste para o caso de uso gerenciar Renda [UC001] [UC002] [UC003]", () => {
  const repository = new InMemoryRendas()
  const gerenciarRenda = new GerenciarRenda(repository)
  const arrayTeste: Renda[] = []

  for(let i = 1; i<11; i++) {
    const renda: RendaProps = {
      uuid: randomUUID(),
      idCarteira: 1,
      categoria: `salario`, 
      competencia: { ano: 2024, mes: 10, dataInclusao:  Date.now().toString() }, 
      descricao: `teste ${i}`,
      fonte: `renda`,
      frequencia: `trimestral`,
      modalidade: `fixo`,
      valor: 200 * i
    }
    gerenciarRenda.cadastrar(renda)
    arrayTeste.push(new Renda(renda))
  }

  it("Deve criar quantas rendas forem necessárias para a mesma carteira", async () => {

    const rendas = await gerenciarRenda.buscar(1)
    expect(rendas).toHaveLength(10)
    expect(rendas).toStrictEqual(expect.arrayContaining(arrayTeste))
  })
})