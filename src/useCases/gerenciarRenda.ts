import { Renda } from "../entities/Renda.ts";
import { RendaRepo } from "../repo/RegistrosRepo.ts";

export class GerenciarRenda {
  constructor(private rendaRepo: RendaRepo) {}

  async cadastrar(renda: Renda) {
    this.rendaRepo.create(renda)
  }

  async loadRendas(carteira_id: number) {
    return this.rendaRepo.load(carteira_id)
  }
}