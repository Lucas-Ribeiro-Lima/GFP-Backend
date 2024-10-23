import { Despesa, DespesaProps } from "../entities/Despesa.ts";
import { DespesaRepo } from "./repo/RegistrosRepo.ts";

export interface GerenciarDespesaProps {
  cadastrar(despesa: Despesa): Promise<void>
  buscar(carteiraId: number): Promise<Despesa[] | []>
  atualizar(despesa: Despesa): Promise<void>
  excluir(uuid: string): Promise<void>
}

export class GerenciarDespesa implements GerenciarDespesaProps {
  constructor(private despesaRepo: DespesaRepo) {}

  async cadastrar(desp: DespesaProps): Promise<void> {
    const despesa = new Despesa(desp)
    await this.despesaRepo.create(despesa.allProps)
  }

  async buscar(carteiraId: number): Promise<Despesa[] | []> {
    const repoReponse = await this.despesaRepo.load(carteiraId)
    const despesas = repoReponse.map(despesa => new Despesa(despesa))
    return despesas ?? []
  }

  async atualizar(desp: DespesaProps): Promise<void> {
    const despesa = new Despesa(desp)
    await this.despesaRepo.save(despesa.allProps)
  }

  async excluir(uuid: string): Promise<void> {
   await this.despesaRepo.delete(uuid)
  }

}