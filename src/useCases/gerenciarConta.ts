import { Configs } from "../entities/Config.ts";
import { Conta } from "../entities/Conta.ts";
import { ContaRepo } from "../repo/ContaRepo.ts";


export class GerenciarConta {
  constructor(private contaRepo: ContaRepo) {}

  async cadastrar(nome: string, email:string, cpf:string, provider:string): Promise<void> {

    let conta = await this.contaRepo.find(email)
    if(conta) throw new Error("Conta já cadastrada com esse e-mail")

    const configs = new Configs()
    conta = new Conta({id: null, nome, email, provider, cpf, configs}) 

    await this.contaRepo.create(conta)
  }

  async buscar(email: string) {
    const conta = await this.contaRepo.find(email)
    return conta ??  null
  }

  async atualizar(conta: Conta): Promise<void> {
    await this.contaRepo.save(conta)
  }
}