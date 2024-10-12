import { Despesa } from "../entities/Despesa.ts";
import { DespesaRepo } from "../repo/RegistrosRepo.ts";

export class GerenciarDespesa {
  constructor(private despesaRepo: DespesaRepo) {}

  async cadastrar(despesa: Despesa) {
    this.despesaRepo.create(despesa)
  }

  async loadDespesas(carteira_id: number) {
    return this.despesaRepo.load(carteira_id)
  }
}