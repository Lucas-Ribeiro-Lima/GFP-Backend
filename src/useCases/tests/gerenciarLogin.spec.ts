import { describe, expect, it, vi } from 'vitest'
import { InMemoryContas } from '../../adapters/repo/in-memory/inMemoryContas.ts'
import { InMemoryFederado } from '../../adapters/repo/in-memory/inMemoryFederado.ts'
import { GerenciarConta } from '../gerenciarConta.ts'
import { GerenciarFederado } from '../gerenciarFederado.ts'
import { GerenciarLogin, ProfileProps } from '../gerenciarLogin.ts'


describe("Testes para o caso de uso de gerenciamento de login", () => {
  const repoConta = new InMemoryContas()
  const repoFederado = new InMemoryFederado()

  const gerenciarConta = new GerenciarConta(repoConta)
  const gerenciarFederado = new GerenciarFederado(repoFederado)

  
  const gerenciarLogin = new GerenciarLogin(gerenciarFederado, gerenciarConta)

  const profile: ProfileProps = { 
    email: "johndoe@doe.uk",
    displayName: "John Doe",
    provider: "google",
    subject: "12345",
    photo: ""
  }
  it("deve criar uma conta e linkar a conta federada corretamente", async () => {

    const conta = await gerenciarLogin.loginFederado(profile)

    expect(conta.email).toBe("johndoe@doe.uk")
    expect(conta.nome).toBe("John Doe")
  })

  it("deve retornar erro ao não encontrar o id da conta vinculada a uma conta federada", () => {
    gerenciarConta.buscar = vi.fn().mockReturnValue(null)

    expect(gerenciarLogin.loginFederado(profile)).rejects.toThrowError("Erro ao realizar login: Conta não encontrada.")    
  })

  it("deve retonar erro caso não seja possivel criar uma nova conta e vincular a conta federada", () => {
    const profile: ProfileProps = { 
      email: "doeJohn@john.uk",
      displayName: "Doe Jonh",
      provider: "google",
      subject: "123456",
      photo: ""
    }
    gerenciarFederado.buscar = vi.fn().mockReturnValue(null)
    gerenciarConta.cadastrar = vi.fn().mockReturnValue(null)

    expect(gerenciarLogin.loginFederado(profile)).rejects.toThrowError("Erro ao linkar a conta federada")
  })

})