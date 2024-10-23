import { describe, expect, it } from "vitest";
import { InMemoryContas } from "../../adapters/repo/in-memory/inMemoryContas.ts";
import { Configs } from "../../entities/Config.ts";
import { GerenciarConta } from "../gerenciarConta.ts";

describe("Testes do caso de uso [UC012] Cadastro de conta", () => {
  const repository = new InMemoryContas()
  const gerenciarConta = new GerenciarConta(repository)

  it("deve criar uma nova conta", async () => {
    const  nome = "John Doe"
    const  email = "johndoe@gmail.com"
    
    await gerenciarConta.cadastrar(nome, email)
 
    const conta = await gerenciarConta.buscar(0)
       
    if(!conta) expect.fail("Erro ao criar conta")
    expect(conta?.nome).toBe("John Doe")
    expect(conta.email).toBe("johndoe@gmail.com")
  }) 

  it("não deve criar uma conta com e-mail já existente", () => {
    const  nome = "John Doe"
    const  email = "johndoe@gmail.com"

    expect(gerenciarConta.cadastrar(nome, email)).rejects.toThrow("Conta já cadastrada com esse e-mail")
  })

  it("deve retornar null ao não encontrar uma conta com o e-mail fornecido", () => {
    const email = "johnnull@gmail.com"

    expect(gerenciarConta.buscarEmail(email)).resolves.toBe(null)
  })

  it("deve retornar null ao não encontrar uma conta com o id fornecido", async () => {
    const id = 1

    const conta = await gerenciarConta.buscar(id)
    expect(conta).toBe(null)
  })


  it("deve atualizar a conta corretamente", async () => {
    const id = 0
    const conta = await gerenciarConta.buscar(id)

    if(!conta) expect.fail("Conta não encontrada")
    
    const contaAlterada = {
      id: conta.id,
      nome: "Doe John",
      email: conta.email,
      cpf: "12345678909",
      configs: conta.configs
    }

    await gerenciarConta.atualizar(contaAlterada)

    const contaTeste = await gerenciarConta.buscar(0)

    expect(contaTeste?.nome).toBe("Doe John")
    expect(contaTeste?.cpf).toBe("12345678909")
  })

  it("deve permitir criar quantas contas forem necessárias", async () => {
    const array = []
    for(let i = 1; i<11; i++) {
      const  nome = `John Doe ${i}`
      const  email = `johndoe${i}@gmail.com`
      await gerenciarConta.cadastrar(nome, email)
      const conta = await gerenciarConta.buscar(i)
      if(conta) array.push(conta)
    }

    array.forEach((conta) => {
      expect(gerenciarConta.buscar(conta.id)).resolves.toEqual(conta)
    })
  })

  it("deve atualizar as configurações completamente corretamente", async () => {
    const id = 0
    const conta = await gerenciarConta.buscar(id)
    const newConfigs = new Configs({tema: 'Light', displayName: "", customWpp: ""})

    if(!conta) expect.fail("Conta não encontrada")

    newConfigs.tema = "Dark"
    newConfigs.displayName = "Doles"
    newConfigs.customWpp = "/files/johndoe@gmail.com.br/wpp.png"

    conta.configs = newConfigs
    await gerenciarConta.atualizar(conta)

    const contaAtt = await gerenciarConta.buscar(id)
    if(!contaAtt) expect.fail("Erro ao buscar conta atualizada")
    expect(contaAtt.configs).toBe(newConfigs)
  })

  it("deve atualizar apenas as configurações informadas", async () => {
    const id = 0
    const conta = await gerenciarConta.buscar(id)

    if(!conta) expect.fail("Conta não foi encontrada durante o teste")
    conta.configs.displayName = "JohnDo"
    
    await gerenciarConta.atualizar(conta)

    const contaAtt = await gerenciarConta.buscar(id)

    if(!contaAtt) expect.fail("Conta não foi encontrada durante o teste")

    expect((contaAtt.configs.displayName)).toBe("JohnDo")
    expect((contaAtt.configs.tema)).toBe("Dark")
    expect((contaAtt.configs.customWpp)).toBe("/files/johndoe@gmail.com.br/wpp.png")
  })
})