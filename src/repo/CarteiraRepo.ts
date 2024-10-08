import { Carteira } from "../entities/Carteira.ts"

export interface CarteiraRepo {
  create(cart: Carteira): Promise<void>
  find(id_dono: number): Promise<Carteira>
  update(cart: Carteira): Promise<Carteira>
  delete(id: number): Promise<void>
}