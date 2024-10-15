import { ContaRepo } from "../adapters/repo/ContaRepo.ts";
import { Configs } from "../entities/Config.ts";
import { Conta } from "../entities/Conta.ts";

export interface GerenciarContaI {
  cadastrar(nome: string, email:string, cpf:string, provider:string): Promise<void>
  buscar(email: string): Promise<Conta | null>
  atualizar(conta: Conta): Promise<void>
  deletar(email: string): Promise<void>
}

export class GerenciarConta implements GerenciarContaI{
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

  async deletar(email: string): Promise<void> {
    this.contaRepo.delete(email)
  }
}
