import { DespesaRepo } from "../adapters/repo/RegistrosRepo.ts";
import { Despesa } from "../entities/Despesa.ts";

export interface GerenciarDespesaI {
  cadastrar(despesa: Despesa): Promise<void>
  buscar(carteiraId: number): Promise<Despesa[] | []>
  atualizar(despesa: Despesa): Promise<void>
  excluir(uuid: string): Promise<void>
}

export class GerenciarDespesa implements GerenciarDespesaI {
  constructor(private despesaRepo: DespesaRepo) {}

  async cadastrar(despesa: Despesa): Promise<void> {
    this.despesaRepo.create(despesa)
  }

  async buscar(carteiraId: number): Promise<Despesa[] | []> {
    return this.despesaRepo.load(carteiraId)
  }

  async atualizar(desp: Despesa): Promise<void> {
    const despesa = new Despesa(desp)
    this.despesaRepo.save(despesa)
  }

  async excluir(uuid: string): Promise<void> {
    this.despesaRepo.delete(uuid)
  }

}