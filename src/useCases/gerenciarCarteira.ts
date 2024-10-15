import { CarteiraRepo } from "../adapters/repo/CarteiraRepo.ts";
import { Carteira } from "../entities/Carteira.ts";

export interface GerenciarCarteiraI {
  cadastrar(carteira: Carteira): Promise<void>
  buscar(idDono: number): Promise<Carteira | null>
  atualizar(carteira: Carteira): Promise<void>
  excluir(idDono: number): Promise<void>
}

export class GerenciarCarteira implements GerenciarCarteiraI {
  constructor(private carteiraRepo: CarteiraRepo) {}
  
  async cadastrar(carteira: Carteira): Promise<void> {
    const carteiraExistente = await this.carteiraRepo.find(carteira.idContaDono)
    if(carteiraExistente) throw new Error("Esta conta já possui uma carteira vinculada")

    await this.carteiraRepo.create(carteira)
  }

  async buscar(idDono: number): Promise<Carteira> {
    const carteira = await this.carteiraRepo.find(idDono)
    if(!carteira) throw new Error("Carteira não encontrada")
    return carteira
  }

  async atualizar(carteira: Carteira): Promise<void> {
    if(!await this.carteiraRepo.find(carteira.idContaDono)) throw new Error("A carteira a atualizar não foi encontrada")
    await this.carteiraRepo.save(carteira)
  }

  async excluir(idDono: number): Promise<void> {
    await this.carteiraRepo.delete(idDono)
  }
}