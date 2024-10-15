import { DespesaRepo } from "../adapters/repo/RegistrosRepo.ts";
import { Despesa } from "../entities/Despesa.ts";

export interface GerenciarDespesaI {
  cadastrar(despesa: Despesa): Promise<void>
  buscar(carteiraId: number): Promise<Despesa[]>
  excluir(uuid: string): Promise<void>
  salvar(despesa: Despesa): Promise<void>
}

export class GerenciarDespesa implements GerenciarDespesaI {
  constructor(private despesaRepo: DespesaRepo) {}

  async cadastrar(despesa: Despesa): Promise<void> {
    this.despesaRepo.create(despesa)
  }

  async buscar(carteiraId: number): Promise<Despesa[]> {
    return this.despesaRepo.load(carteiraId)
  }

  async excluir(uuid: string): Promise<void> {
    this.despesaRepo.delete(uuid)
  }

  async salvar(despesa: Despesa): Promise<void> {
    this.despesaRepo.save(despesa)
  }
}