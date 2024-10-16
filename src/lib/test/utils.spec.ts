import { describe, expect, it } from 'vitest'
import { cpfValido, emailValido } from '../utils.ts'


describe("Testes para as funções utilitárias", () => {  
  it("deve retornar verdadeiro para o cpf válido", () => {
    const cpf_valido = '123456789-09'
    const cpf_valido2 = '12345678909'
    expect(cpfValido(cpf_valido)).toBeTruthy()
    expect(cpfValido(cpf_valido2)).toBeTruthy()
  })
  
  it("deve retornar falso para o cpf inválido", () => {
    const cpf_invalido = '111111111-11'
    const cpf_invalido2 = '24982523898'
    expect(cpfValido(cpf_invalido)).toBeFalsy()
    expect(cpfValido(cpf_invalido2)).toBeFalsy()
  })
  
  it("deve retornar verdadeiro para o e-mail válido", () => {
    const email_valido = 'foo-bar@bar.uk'
    const email_valido2 = 'foobar@bar.org.uk'
    expect(emailValido(email_valido)).toBeTruthy()
    expect(emailValido(email_valido2)).toBeTruthy()
  })

  it("deve retornar falso para o e-mail inválido", () => {
    const email_invalido = 'foo@bar'
    const email_invalido2 = 'foobarbar.org.uk'
    expect(emailValido(email_invalido)).toBeFalsy()
    expect(emailValido(email_invalido2)).toBeFalsy()
  })
})

