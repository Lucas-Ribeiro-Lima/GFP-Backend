import { UseCaseError } from "../errors/customErrors.ts"
import { Federado, FederadoProps } from "../entities/Federado.ts"
import { FederadoRepo } from "./repo/FederadoRepo.ts"

export interface GerenciarFederadoProps {
  buscar(provider: string, subject: string): Promise<Federado | null>
  criar(federado: FederadoProps): Promise<void>
}

export class GerenciarFederado implements GerenciarFederadoProps {
  constructor(private federadoRepo: FederadoRepo) {}

  async buscar(provider: string, subject: string) {
    const repoResponse = await this.federadoRepo.find(provider, subject)
    return (repoResponse) ? new Federado(repoResponse) : null
  }

  async criar({idConta, provider, subject}: FederadoProps) {
    const federadoExists = await this.federadoRepo.find(provider, subject)
    if(federadoExists) throw new UseCaseError("Conta federada ja existente")
    const federado = new Federado({idConta, provider, subject})
    await this.federadoRepo.create(federado)
  }
}