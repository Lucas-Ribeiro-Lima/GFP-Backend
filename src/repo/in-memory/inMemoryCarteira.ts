import { Carteira } from "../../entities/Carteira.ts";
import { CarteiraRepo } from "../CarteiraRepo.ts";

export class InMemoryCarteira implements CarteiraRepo {
  public carteiraArray: Carteira[] = []

  async create(cart: Carteira): Promise<void> {
    this.carteiraArray.push(cart)  
  }

  async find(id_dono: number): Promise<Carteira> {
    const find = this.carteiraArray.find((cart) => cart.conta_dono === id_dono)
    if(!find) throw new Error("Carteira não encontrada")
    return find
  }

  async save(updatedCart: Carteira): Promise<void> {
    const index = this.carteiraArray.findIndex((cart) => cart.id === updatedCart.id)
    if(!index) throw new Error("Carteira não encontada")
    this.carteiraArray[index] = updatedCart
  }

  async delete(id: number): Promise<void> {
    this.carteiraArray.filter((cart) => cart.id !== id)
  }
}