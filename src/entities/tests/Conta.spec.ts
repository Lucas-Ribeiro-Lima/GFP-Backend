import { Configs } from '../Config.ts'
import { Conta } from '../Conta.ts'
import { describe, expect, it } from 'vitest'

describe("Testes unitários para a classe Conta", () => {
  
  it("deve criar um objeto da classe conta", () => {
    const contaValida = {
      id: 1,
      nome: "John Doe",
      cpf: '123456789-09',
      email: 'foo-bar@bar.uk',
      configs: new Configs({tema: 'Light', displayName: "", customWpp: ""})
    }
    const conta = new Conta(contaValida)

    expect(conta).toMatchObject(contaValida)
  })

  it("não deve criar uma conta com e-mail inválido", () => {
    const conta_email_invalido = {
      id: 1,
      nome: "John Doe",
      cpf: '123456789-09',
      email: 'foo-barbar.uk',
      configs: new Configs({tema: 'Light', displayName: "", customWpp: ""})
    }  
    
    expect(() => new Conta(conta_email_invalido)).toThrowError()
  })

  it("Não deve criar uma conta com cpf inválido", () => {
    const conta_cpf_invalido = {
      id: 1,
      nome: "John Doe",
      cpf: '111111111-11',
      email: 'foo-barbar.uk',
      configs: new Configs({tema: 'Light', displayName: "", customWpp: ""})
    }

    expect(() => new Conta(conta_cpf_invalido)).toThrowError()
  })
})