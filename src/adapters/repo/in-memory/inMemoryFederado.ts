import { FederadoProps } from "@/entities/Federado.ts";
import { FederadoRepo } from "../../../useCases/repo/FederadoRepo.ts";

export class InMemoryFederado implements FederadoRepo {
  private readonly federadoArray: FederadoProps[] = []

  async find(provider: string, subject: string): Promise<FederadoProps | null> {
    return this.federadoArray.find(
      (federado) => federado.subject === subject && federado.provider === provider) 
        ?? null
  }

  async create(federado: FederadoProps): Promise<void> {
    this.federadoArray.push(federado)
  }
}