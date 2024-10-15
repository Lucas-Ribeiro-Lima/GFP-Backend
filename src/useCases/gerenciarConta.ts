import { Configs } from "../entities/Config.ts";
import { Conta } from "../entities/Conta.ts";
import { ContaRepo } from "../repo/ContaRepo.ts";


export class GerenciarConta {
  constructor(private contaRepo: ContaRepo) {}

  async cadastrar(nome: string, email:string, cpf:string, provider:string): Promise<void> {
    let conta = await this.contaRepo.find(email)
    if(conta) throw new Error("Conta já cadastrada com esse e-mail")

    const configs = new Configs({tema: "Light", displayName: "", customWpp: ""})
    conta = new Conta({id: null, nome, email, provider, cpf, configs}) 

    await this.contaRepo.create(conta)
  }

  async buscar(email: string) {
    return await this.contaRepo.find(email)
  }

  async atualizar(conta: Conta): Promise<void> {
    if(!this.contaRepo.find(conta.email)) throw new Error("Conta não encontrada")
    await this.contaRepo.save(conta)
  }
}
