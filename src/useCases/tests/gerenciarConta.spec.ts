import { describe, expect, it } from "vitest";
import { Conta } from "../../entities/Conta.ts";
import { InMemoryContas } from "../../repo/in-memory/inMemoryContas.ts";
import { GerenciarConta } from "../gerenciarConta.ts";
import { Configs } from "../../entities/Config.ts";

describe("Testes do caso de uso [UC012] Cadastro de conta", () => {
  const repository = new InMemoryContas()
  const gerenciarConta = new GerenciarConta(repository)

  it("deve criar uma nova conta", () => {
    const  nome = "John Doe"
    const  email = "johndoe@gmail.com"
    const cpf = '12345678909'
    const  provider = 'Google'
    
    gerenciarConta.cadastrar(nome, email, cpf, provider)
 
    expect(gerenciarConta.buscar(email)).not.toBe(null)
  }) 

  it("não deve criar uma conta com e-mail já existente", () => {
    const  nome = "John Doe"
    const  email = "johndoe@gmail.com"
    const cpf = '12345678909'
    const  provider = 'Google'

    expect(gerenciarConta.cadastrar(nome, email, cpf, provider)).rejects.toThrow("Conta já cadastrada com esse e-mail")
  })

  it("deve retornar null ao não encontrar uma conta com o e-mail fornecido", () => {
    const email = "johnnull@gmail.com"

    expect(gerenciarConta.buscar(email)).resolves.toBe(null)
  })


  it("deve atualizar a conta do e-mail fornecido", async () => {
    const email = "johndoe@gmail.com"
    const conta = await gerenciarConta.buscar(email)

    if(!conta) throw new Error("Conta não encontrada")
    
    const contaAlterada = new Conta({
      id: conta.id,
      nome: "Doe John",
      email,
      cpf: "12345678909",
      provider: "Microsoft",
      configs: conta.configs
    })

    gerenciarConta.atualizar(contaAlterada)

    const contaTeste = await gerenciarConta.buscar(email)

    expect(contaTeste?.nome).toBe("Doe John")
    expect(contaTeste?.cpf).toBe("12345678909")
    expect(contaTeste?.provider).toBe("Microsoft")
  })

  it("deve permitir criar quantas contas forem necessárias", async () => {
    const array = []
    for(let i = 1; i<11; i++) {
      const  nome = `John Doe ${i}`
      const  email = `johndoe${i}@gmail.com`
      const cpf = `12345678909`
      const  provider = `Google ${i}`
      gerenciarConta.cadastrar(nome, email, cpf, provider)
      const conta = await gerenciarConta.buscar(email)
      if(conta) array.push(conta)
    }

    array.forEach(async (conta) => {
      expect(gerenciarConta.buscar(conta.email)).resolves.toBe(conta)
    })
  })

  it("deve atualizar as configurações completamente corretamente", async () => {
    const email = "johndoe@gmail.com"
    const conta = await gerenciarConta.buscar(email)
    const newConfigs = new Configs({tema: 'Light', displayName: "", customWpp: ""})

    if(!conta) throw new Error("Conta não encontrada")

    newConfigs.tema = "Dark"
    newConfigs.displayName = "Doles"
    newConfigs.customWpp = "/files/johndoe@gmail.com.br/wpp.png"

    conta.configs = newConfigs
    await gerenciarConta.atualizar(conta)

    expect(gerenciarConta.buscar(email).then((conta) => conta?.configs)).resolves.toBe(newConfigs)
  })

  it("deve atualizar apenas as configurações informadas", async () => {
    const email = "johndoe@gmail.com"
    const conta = await gerenciarConta.buscar(email)

    if(!conta) throw new Error("Conta não encontrada")
    conta.configs.displayName = "JohnDo"
    
    await gerenciarConta.atualizar(conta)

    const contaAtt = await gerenciarConta.buscar(email)

    if(!contaAtt) throw new Error("Conta não encontrada")

    expect((contaAtt.configs.displayName)).toBe("JohnDo")
    expect((contaAtt.configs.tema)).toBe("Dark")
    expect((contaAtt.configs.customWpp)).toBe("/files/johndoe@gmail.com.br/wpp.png")
  })
})