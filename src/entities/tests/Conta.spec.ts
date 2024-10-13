import { Configs } from '../Config.ts'
import { Conta } from '../Conta.ts'
import { describe, expect, it } from 'vitest'

describe("Testes unitários para a classe Conta", () => {
  
  it("deve criar um objeto da classe conta", () => {
    const conta_valida = {
      id: 1,
      nome: "John Doe",
      cpf: '123456789-09',
      email: 'foo-bar@bar.uk',
      provider: 'Google',
      configs: new Configs()
    }
    const conta = new Conta(conta_valida)

    expect(conta).toMatchObject(conta_valida)
  })

  it("não deve criar uma conta com e-mail inválido", () => {
    const conta_email_invalido = {
      id: 1,
      nome: "John Doe",
      cpf: '123456789-09',
      email: 'foo-barbar.uk',
      provider: 'Google',
      configs: new Configs()
    }  
    
    expect(() => new Conta(conta_email_invalido)).toThrowError()
  })

  it("Não deve criar uma conta com cpf inválido", () => {
    const conta_cpf_invalido = {
      id: 1,
      nome: "John Doe",
      cpf: '111111111-11',
      email: 'foo-barbar.uk',
      provider: 'Google',
      configs: new Configs()
    }

    expect(() => new Conta(conta_cpf_invalido)).toThrowError()
  })
})