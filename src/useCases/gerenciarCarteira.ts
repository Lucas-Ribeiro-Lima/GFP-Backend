import { Carteira, CarteiraProps } from "../entities/Carteira.ts";
import { UseCaseError } from "../errors/customErrors.ts";
import { CarteiraRepo } from "./repo/CarteiraRepo.ts";

export interface GerenciarCarteiraProps {
  cadastrar(carteira: CarteiraProps): Promise<void>
  buscar(idDono: number): Promise<Carteira | null>
  atualizar(carteira: CarteiraProps): Promise<void>
  excluir(id: number): Promise<void>
}

export class GerenciarCarteira implements GerenciarCarteiraProps {
  constructor(private carteiraRepo: CarteiraRepo) {}
  
  async cadastrar(cart: CarteiraProps): Promise<void> {
    const carteiraExistente = await this.carteiraRepo.find(cart.idContaDono)
    if(carteiraExistente) throw new UseCaseError("Esta conta já possui uma carteira vinculada")
    
    const carteira = new Carteira(cart)

    await this.carteiraRepo.create(carteira.allProps)
  }

  async buscar(idDono: number): Promise<Carteira | null> {
    const repoResponse = await this.carteiraRepo.find(idDono)
    return (repoResponse)  ? new Carteira(repoResponse) : null
  }

  async atualizar(cart: CarteiraProps): Promise<void> {
    const carteiraExistente = await this.carteiraRepo.find(cart.idContaDono)
    if(!carteiraExistente) throw new UseCaseError("A carteira informada não foi encontrada")
    const carteira = new Carteira(cart)
    await this.carteiraRepo.save(carteira.allProps)
  }

  async excluir(id: number): Promise<void> {
    await this.carteiraRepo.delete(id)
  }
}