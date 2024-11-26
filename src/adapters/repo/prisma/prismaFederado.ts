import { PrismaClient } from "@prisma/client";
import { FederadoProps } from "../../../entities/Federado.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";
import { logger } from "../../../lib/utils.ts";
import { FederadoRepo } from "../../../useCases/repo/FederadoRepo.ts";


export class PrismaFederado implements FederadoRepo {
  constructor(private readonly pc = new PrismaClient()) {}
  
  async find(provider: string, subject: string): Promise<FederadoProps | null> {
    try {
      const prismaResponse = await this.pc.federado.findFirst({
        where: {
          provider,
          subject
        }
      })
      return prismaResponse ?? null
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao buscar conta federada")
    } finally {
      this.pc.$disconnect()
    }
  }

  async create({ idConta, provider, subject}: FederadoProps): Promise<void> {
    try {
      await this.pc.federado.create({
        data: {
          idConta,
          provider,
          subject
        }
      })
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao criar conta federada")
    } finally {
      this.pc.$disconnect()
    }
  }
}