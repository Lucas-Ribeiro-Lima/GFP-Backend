import { describe, expect, it } from 'vitest'
import { Federado, FederadoProps } from '../Federado.ts'

describe("Testes para a entidade Federado", () => {

  it("deve criar um objeto da classe federado corretamente", () => {
    const federado: FederadoProps = {
      idConta: 1,
      provider: "google",
      subject: "1111111"
    }

    expect(() => new Federado(federado)).not.toThrowError()
  })
})