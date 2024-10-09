import { describe, expect, it } from 'vitest'
import { Carteira } from '../Carteira.ts'

describe("Testes da classe Carteira", () => {
  const carteiraValid = new Carteira({
    id: 1,
    id_conta_dono: 1,
    compartilhada: false,
    idGrupoEconomico: undefined,
    meta: 0,
    nome: "carteira de teste",
    saldo: 0,
  })

  it("deve criar uma carteira válida", () => {
    expect(carteiraValid).instanceOf(Carteira)
  })

  it("não deve permitir atribuir um nome pequeno a carteira", () => {
    expect(() => carteiraValid.nome = 'abc').toThrowError()
  })

  it("não deve permitir atribuir uma meta negativa a carteira", () => {
    expect(() => carteiraValid.meta = -1).toThrowError()
  })
})