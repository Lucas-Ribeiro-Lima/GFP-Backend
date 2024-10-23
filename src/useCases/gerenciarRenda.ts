import { Renda, RendaProps } from "../entities/Renda.ts";
import { RendaRepo } from "./repo/RegistrosRepo.ts";
export interface GerenciarRendaProps {
  cadastrar(renda: RendaProps): Promise<void>
  buscar(carteiraId: number): Promise<Renda[] | []>
  atualizar(renda: RendaProps): Promise<void>
  excluir(uuid: string): Promise<void>
}
export class GerenciarRenda implements GerenciarRendaProps {
  constructor(private rendaRepo: RendaRepo) {}

  async cadastrar(rend: RendaProps) {
    const renda = new Renda(rend)
    await this.rendaRepo.create(renda.allProps)
  }

  async buscar(carteira_id: number): Promise<Renda[] | []> {
    const repoResponse = await this.rendaRepo.load(carteira_id)
    const rendas = repoResponse.map(renda => new Renda(renda))
    return rendas ?? []
  }

  async atualizar(rend: RendaProps) {
    const renda = new Renda(rend)
    await this.rendaRepo.save(renda.allProps)
  }

  async excluir(uuid: string) {
    await this.rendaRepo.delete(uuid)
  }
}