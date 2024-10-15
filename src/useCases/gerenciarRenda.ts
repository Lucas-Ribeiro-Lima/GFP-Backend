import { RendaRepo } from "../adapters/repo/RegistrosRepo.ts";
import { Renda } from "../entities/Renda.ts";
export interface GerenciarRendaI {
  cadastrar(renda: Renda): Promise<void>
  buscar(carteiraId: number): Promise<Renda[]>
  atualizar(renda: Renda): Promise<void>
  excluir(uuid: string): Promise<void>
}
export class GerenciarRenda implements GerenciarRendaI {
  constructor(private rendaRepo: RendaRepo) {}

  async cadastrar(renda: Renda) {
    this.rendaRepo.create(renda)
  }

  async buscar(carteira_id: number) {
    return this.rendaRepo.load(carteira_id)
  }

  async atualizar(renda: Renda) {
    this.rendaRepo.save(renda)
  }

  async excluir(uuid: string) {
    this.rendaRepo.delete(uuid)
  }
}