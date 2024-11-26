import { Renda, RendaProps } from "../entities/Renda.ts";
import { RendaRepo } from "./repo/RegistrosRepo.ts";
export interface GerenciarRendaProps {
  cadastrar(renda: RendaProps): Promise<void>
  buscar(carteiraId: number): Promise<RendaProps[] | []>
  atualizar(renda: RendaProps): Promise<void>
  excluir(uuid: string): Promise<void>
}
export class GerenciarRenda implements GerenciarRendaProps {
  constructor(private readonly rendaRepo: RendaRepo) {}

  async cadastrar(rend: RendaProps) {
    const renda = new Renda(rend)
    await this.rendaRepo.create(renda.allProps)
  }

  async buscar(carteira_id: number): Promise<RendaProps[] | []> {
    const repoResponse = await this.rendaRepo.load(carteira_id)
    const rendas = repoResponse.map(renda => new Renda(renda).allProps)
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