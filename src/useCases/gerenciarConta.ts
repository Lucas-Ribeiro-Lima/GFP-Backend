import { Configs } from "../entities/Config.ts";
import { Conta, ContaProps } from "../entities/Conta.ts";
import { UseCaseError } from "../errors/customErrors.ts";
import { ContaRepo } from "./repo/ContaRepo.ts";

export interface GerenciarContaProps {
  cadastrar(nome: string, email:string, photo?: string): Promise<number>
  buscar(id: number): Promise<ContaProps | null>
  buscarEmail(email: string): Promise<ContaProps | null>
  atualizar(conta: ContaProps): Promise<void>
  excluir(email: string): Promise<void>
}

export class GerenciarConta implements GerenciarContaProps{
  constructor(private contaRepo: ContaRepo) {}

  async cadastrar(nome: string, email:string, photo: string): Promise<number> {
    const contaExistente = await this.contaRepo.findEmail(email)
    if(contaExistente) throw new UseCaseError("Conta já cadastrada com esse e-mail")

    const configs = new Configs({ tema: "Light", displayName: "", customWpp: "" })
    const conta = new Conta({ nome, email, configs, photo }) 
    conta.configs = configs.allProps

    return await this.contaRepo.create(conta.allProps)
  }

  async buscar(id: number): Promise<ContaProps | null> {
    const repoReponse = await this.contaRepo.find(id)
    return (repoReponse) ? new Conta(repoReponse).allProps : null
  }

  async buscarEmail(email: string): Promise<ContaProps | null> {
    const repoResponse = await this.contaRepo.findEmail(email)
    return (repoResponse) ? new Conta(repoResponse).allProps : null
  }

  async atualizar(acc: ContaProps): Promise<void> {
    const contaExistente = await this.contaRepo.findEmail(acc.email)
    if(!contaExistente) throw new UseCaseError("Conta informada não existe")
    const conta = new Conta(acc)
    await this.contaRepo.save(conta.allProps)
  }

  async excluir(email: string): Promise<void> {
    this.contaRepo.delete(email)
  }
}
