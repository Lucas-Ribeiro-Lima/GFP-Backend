import { randomUUID } from 'crypto'
import { describe, expect, it } from 'vitest'
import { InMemoryRendas } from '../../adapters/repo/in-memory/inMemoryRegistros.ts'
import { Renda } from '../../entities/Renda.ts'
import { GerenciarRenda } from '../gerenciarRenda.ts'

describe("Teste para o caso de uso gerenciar Renda [UC001] [UC002] [UC003]", () => {
  const repository = new InMemoryRendas()
  const gerenciarRenda = new GerenciarRenda(repository)
  const arrayTeste: Renda[] = []

  const renda = new Renda({
    uuid: '0',
    idCarteira: 1,
    categoria: "salario", 
    competencia: { ano: 2024, mes: 10, dataInclusao:  Date.now().toString() }, 
    descricao: "teste",
    fonte: "renda",
    frequencia: "trimestral",
    modalidade: "fixo",
    valor: 200}
  )

  it("Deve criar a renda solicitada", async () => {
    await gerenciarRenda.cadastrar(renda)
    expect(await gerenciarRenda.buscar(renda.idCarteira)).toContainEqual(renda)
  })

  it("Deve criar quantas rendas forem necessárias para a mesma carteira", async () => {
   
    const idCarteira = 1
    for(let i = 1; i<11; i++) {
      const renda = new Renda({
        uuid: randomUUID(),
        idCarteira,
        categoria: `salario`, 
        competencia: { ano: 2024, mes: 10, dataInclusao:  Date.now().toString() }, 
        descricao: `teste ${i}`,
        fonte: `renda`,
        frequencia: `trimestral`,
        modalidade: `fixo`,
        valor: 200 * i
      })
      gerenciarRenda.cadastrar(renda)
      arrayTeste.push(renda)
    }
    const rendas = await gerenciarRenda.buscar(idCarteira)
    expect(rendas).toHaveLength(11)
    expect(rendas).toEqual(expect.arrayContaining(arrayTeste))
  })
})