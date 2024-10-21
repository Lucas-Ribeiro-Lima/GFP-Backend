import { RendaRepo } from "../adapters/repo/RegistrosRepo.ts";
import { Renda, RendaProps } from "../entities/Renda.ts";
export interface GerenciarRendaI {
  cadastrar(renda: Renda): Promise<void>
  buscar(carteiraId: number): Promise<Renda[] | []>
  atualizar(renda: Renda): Promise<void>
  excluir(uuid: string): Promise<void>
}
export class GerenciarRenda implements GerenciarRendaI {
  constructor(private rendaRepo: RendaRepo) {}

  async cadastrar(rend: RendaProps) {
    const renda = new Renda(rend)
    await this.rendaRepo.create(renda)
  }

  async buscar(carteira_id: number): Promise<Renda[] | []> {
    return await this.rendaRepo.load(carteira_id)
  }

  async atualizar(rend: RendaProps) {
    const renda = new Renda(rend)
    await this.rendaRepo.save(renda)
  }

  async excluir(uuid: string) {
    await this.rendaRepo.delete(uuid)
  }
}