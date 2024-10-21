import { CarteiraRepo } from "../adapters/repo/CarteiraRepo.ts";
import { Carteira, CarteiraProps } from "../entities/Carteira.ts";
import { UseCaseError } from "../errors/customErrors.ts";

export interface GerenciarCarteiraI {
  cadastrar(carteira: Carteira): Promise<void>
  buscar(idDono: number): Promise<Carteira | null>
  atualizar(carteira: Carteira): Promise<void>
  excluir(id: number): Promise<void>
}

export class GerenciarCarteira implements GerenciarCarteiraI {
  constructor(private carteiraRepo: CarteiraRepo) {}
  
  async cadastrar(cart: CarteiraProps): Promise<void> {
    const carteiraExistente = await this.carteiraRepo.find(cart.idContaDono)
    if(carteiraExistente) throw new UseCaseError("Esta conta já possui uma carteira vinculada")
    
    const carteira = new Carteira(cart)

    await this.carteiraRepo.create(carteira)
  }

  async buscar(idDono: number): Promise<Carteira | null> {
    return await this.carteiraRepo.find(idDono) ?? null
  }

  async atualizar(cart: CarteiraProps): Promise<void> {
    const carteiraExistente = await this.carteiraRepo.find(cart.idContaDono)
    if(!carteiraExistente) throw new UseCaseError("A carteira informada não foi encontrada")
    const carteira = new Carteira(cart)
    await this.carteiraRepo.save(carteira)
  }

  async excluir(id: number): Promise<void> {
    await this.carteiraRepo.delete(id)
  }
}