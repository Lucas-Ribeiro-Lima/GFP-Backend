import { FederadoProps } from '../../entities/Federado.ts'

export interface FederadoRepo {
  find(provider: string, subject: string): Promise<FederadoProps | null>
  create(federado: FederadoProps): Promise<void>
}