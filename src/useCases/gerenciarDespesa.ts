import { DespesaRepo } from "../adapters/repo/RegistrosRepo.ts";
import { Despesa, DespesaProps } from "../entities/Despesa.ts";

export interface GerenciarDespesaI {
  cadastrar(despesa: Despesa): Promise<void>
  buscar(carteiraId: number): Promise<Despesa[] | []>
  atualizar(despesa: Despesa): Promise<void>
  excluir(uuid: string): Promise<void>
}

export class GerenciarDespesa implements GerenciarDespesaI {
  constructor(private despesaRepo: DespesaRepo) {}

  async cadastrar(desp: DespesaProps): Promise<void> {
    const despesa = new Despesa(desp)
    await this.despesaRepo.create(despesa)
  }

  async buscar(carteiraId: number): Promise<Despesa[] | []> {
    return await this.despesaRepo.load(carteiraId)
  }

  async atualizar(desp: DespesaProps): Promise<void> {
    const despesa = new Despesa(desp)
    await this.despesaRepo.save(despesa)
  }

  async excluir(uuid: string): Promise<void> {
   await this.despesaRepo.delete(uuid)
  }

}