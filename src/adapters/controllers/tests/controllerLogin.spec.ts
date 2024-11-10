import { describe, expect, it } from 'vitest'

import { InMemoryContas } from '../../../adapters/repo/in-memory/inMemoryContas.ts'
import { InMemoryFederado } from '../../../adapters/repo/in-memory/inMemoryFederado.ts'
import { GerenciarConta } from '../../../useCases/gerenciarConta.ts'
import { GerenciarFederado } from '../../../useCases/gerenciarFederado.ts'
import { GerenciarLogin } from '../../../useCases/gerenciarLogin.ts'
import { Profile } from 'passport-google-oauth20'
import { ControllerLogin } from '../controllerLogin.ts'

describe("Testes de uso para o controller de login", () => {
  const repoConta = new InMemoryContas()
  const repoFederado = new InMemoryFederado()

  const gerenciarConta = new GerenciarConta(repoConta)
  const gerenciarFederado = new GerenciarFederado(repoFederado)

  const gerenciarLogin = new GerenciarLogin(gerenciarFederado, gerenciarConta)

  const controllerLogin = new ControllerLogin(gerenciarLogin)
  
  it("Deve retornar uma conta linkada com o google", async () => {
    const accProvided = {
      id: "123",
      displayName: "john doe",
      emails: [{ value: "johndoe@doe.uk", verified: true}]
    } as unknown as Profile

    const conta = await controllerLogin.validate(accProvided)
    expect(conta.nome).toBe("john doe")
    expect(conta.email).toBe("johndoe@doe.uk")
    expect(conta.configs).toStrictEqual({
      customWpp: "",
      displayName: "",
      tema: "Light"
    })
  })
})