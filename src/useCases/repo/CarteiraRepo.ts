import { CarteiraProps } from "@/entities/Carteira.ts"

export interface CarteiraRepo {
  create(cart: CarteiraProps): Promise<void>
  find(idDono: number): Promise<CarteiraProps | null>
  save(cart: CarteiraProps): Promise<void>
  delete(id: number): Promise<void>
}