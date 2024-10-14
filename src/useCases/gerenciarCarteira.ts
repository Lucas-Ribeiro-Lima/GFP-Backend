import { Carteira } from "../entities/Carteira.ts";
import { CarteiraRepo } from "../repo/CarteiraRepo.ts";

export class GerenciarCarteira {
  constructor(private carteiraRepo: CarteiraRepo) {}

  async cadastrar(carteira: Carteira): Promise<void> {
    await this.carteiraRepo.create(carteira)
  }

  async buscar(idDono: number): Promise<Carteira> {
    const carteira = await this.carteiraRepo.find(idDono)
    if(!carteira) throw new Error("Carteira não encontrada")
    return carteira
  }

  async atualizar(carteira: Carteira): Promise<void> {
    await this.carteiraRepo.save(carteira)
  }
}