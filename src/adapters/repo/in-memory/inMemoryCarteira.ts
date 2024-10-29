import { CarteiraProps } from "@/entities/Carteira.ts";
import { CarteiraRepo } from "@/useCases/repo/CarteiraRepo.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";

export class InMemoryCarteira implements CarteiraRepo {
  public carteiraArray: Array<CarteiraProps> = []

  async create(cart: CarteiraProps): Promise<void> {
    this.carteiraArray.push(cart)  
  }

  async find(idContaDono: number): Promise<CarteiraProps | null> {
    return this.carteiraArray.find((cart) => cart.idContaDono === idContaDono) ?? null
  }

  async save(updatedCart: CarteiraProps): Promise<void> {
    const index = this.carteiraArray.findIndex((cart) => cart.idContaDono === updatedCart.idContaDono)
    if(index === -1) throw new AdapterRepoError("carteira not found")
    this.carteiraArray[index] = updatedCart
  }

  async delete(id: number): Promise<void> {
    this.carteiraArray = this.carteiraArray.filter((cart) => cart.id !== id)
  }
}