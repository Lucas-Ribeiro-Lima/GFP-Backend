import { PrismaClient } from '@prisma/client';
import { CarteiraProps } from '../../../entities/Carteira.ts';
import { AdapterRepoError } from '../../../errors/customErrors.ts';
import { logger } from '../../../lib/utils.ts';
import { CarteiraRepo } from '../../../useCases/repo/CarteiraRepo.ts';


export class PrismaCarteira implements CarteiraRepo {
  constructor(private pc = new PrismaClient({log: ['error'], errorFormat: 'minimal'})) {}

  async create({idContaDono, nome, compartilhada, meta, saldo}: CarteiraProps): Promise<void> {
    try {
      await this.pc.carteira.create({
        data: {
          idContaDono,
          nome,
          compartilhada,
          meta,
          saldo
        }
      })
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao criar carteira no banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  } 

  async delete(id: number): Promise<void> {
    try {
      await this.pc.carteira.delete({
        where: {
          id
        }
      })
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao deletar carteira do banco de dados")
    }
  }

  async find(idContaDono: number): Promise<CarteiraProps | null> {
    try {
      const prismaResponse = await this.pc.carteira.findUnique({
        where: {
          idContaDono
        }
      })
      return prismaResponse ?? null
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      return null
    } finally {
      this.pc.$disconnect()
    }
  }

  async save({id, nome, saldo, meta, compartilhada}: CarteiraProps): Promise<void> {
    try {
      await this.pc.carteira.update({
        data: {
          nome,
          saldo,
          meta,
          compartilhada
        }, 
        where: {
          id
        }
      })
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao atualizar a carteira")
    }
  }
}