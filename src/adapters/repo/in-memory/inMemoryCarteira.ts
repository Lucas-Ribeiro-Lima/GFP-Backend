import { Carteira } from "../../entities/Carteira.ts";
import { CarteiraRepo } from "../repo/CarteiraRepo.ts";

export class InMemoryCarteira implements CarteiraRepo {
  public carteiraArray: Carteira[] = []

  async create(cart: Carteira): Promise<void> {
    this.carteiraArray.push(cart)  
  }

  async find(id_dono: number): Promise<Carteira | null> {
    return this.carteiraArray.find((cart) => cart.idContaDono === id_dono) ?? null
  }

  async save(updatedCart: Carteira): Promise<void> {
    const index = this.carteiraArray.findIndex((cart) => cart.idContaDono === updatedCart.idContaDono)
    if(index === -1) throw new Error("A carteira especificada não existe no banco de dados")
    this.carteiraArray[index] = updatedCart
  }

  async delete(id: number): Promise<void> {
    this.carteiraArray.filter((cart) => cart.id !== id)
  }
}