import { describe, expect, it } from "vitest";
import { InMemoryContas } from "../../repo/in-memory/inMemoryContas.ts";
import { GerenciarConta } from "../gerenciarConta.ts";
import { Conta } from "../../entities/Conta.ts";

describe("Testes do caso de uso [UC012] Cadastro de conta", () => {
  const repository = new InMemoryContas()
  const gerenciarConta = new GerenciarConta(repository)

  it("deve criar uma nova conta", () => {

    const  nome = "John Doe"
    const  email = "johndoe@gmail.com"
    const cpf = '1234568910'
    const  provider = 'Google'
    
    gerenciarConta.cadastrar(nome, email, cpf, provider)
 
    expect(gerenciarConta.buscar(email)).not.toBe(null)
  }) 

  it("não deve criar uma conta com e-mail já existente", () => {

    const  nome = "John Doe"
    const  email = "johndoe@gmail.com"
    const cpf = '1234568910'
    const  provider = 'Google'

    expect(() => gerenciarConta.cadastrar(nome, email, cpf, provider)).rejects.toThrow("Conta já cadastrada com esse e-mail")
  })

  it("deve atualizar a conta do e-mail fornecido", async () => {
    const email = "johndoe@gmail.com"
    const conta = await gerenciarConta.buscar(email)

    if(!conta) return
    
    const contaAlterada = new Conta({
      id: conta.id,
      nome: "Doe John",
      email,
      cpf: "01987654321",
      provider: "Microsoft",
      configs: conta.configs
    })

    gerenciarConta.atualizar(contaAlterada)

    const contaTeste = await gerenciarConta.buscar(email)

    if(!contaTeste) return

    expect(contaTeste.nome).toBe("Doe John")
    expect(contaTeste.cpf).toBe("01987654321")
    expect(contaTeste.provider).toBe("Microsoft")
  })
})