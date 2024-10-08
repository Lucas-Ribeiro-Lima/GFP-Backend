import { Conta } from "../entities/Conta.ts";
import { ContaRepo } from "../repo/ContaRepo.ts";

type CadastroContaResponse = Conta

export class CadastraConta {
  constructor(private contaRepo: ContaRepo) {}

  async execute({
    nome,
    email,
    cpf,
    provider
  }: Conta): Promise<CadastroContaResponse> {
    const conta = new Conta({email, provider, nome, cpf})

    await this.contaRepo.create(conta)
    const response = this.contaRepo.find(conta.email)

    return response
  }
}