import { Carteira } from "../entities/Carteira.ts"

export interface CarteiraRepo {
  create(cart: Carteira): Promise<void>
  find(idDono: number): Promise<Carteira | null>
  save(cart: Carteira): Promise<void>
  delete(id: number): Promise<void>
}