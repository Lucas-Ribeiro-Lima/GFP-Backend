import { Carteira } from '../../../entities/Carteira.ts';
import { PrismaClient } from '@prisma/client';
import { CarteiraRepo } from '../CarteiraRepo.ts';
import { AdapterRepoError } from '../../../errors/customErrors.ts';
import { logWriter } from '../../../lib/utils.ts'


export class PrismaCarteira implements CarteiraRepo {
  constructor(private pc = new PrismaClient({log: ['error'], errorFormat: 'minimal'})) {}

  async create({idContaDono, nome, compartilhada, meta, saldo}: Carteira): Promise<void> {
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
      if(error instanceof Error) logWriter(error)
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
      if(error instanceof Error) logWriter(error)
      throw new AdapterRepoError("Erro ao deletar carteira do banco de dados")
    }
  }

  async find(id_dono: number): Promise<Carteira | null> {
    try {
      const prismaResponse = await this.pc.carteira.findUnique({
        where: {
          idContaDono: id_dono
        }
      })
      if(!prismaResponse) return null

      const { id, idContaDono, idGrupoEconomico, nome, saldo, compartilhada, meta} = prismaResponse

      const carteira = new Carteira({
        id,
        idContaDono,
        idGrupoEconomico,
        nome,
        saldo,
        compartilhada,
        meta
      })

      return carteira
    } catch (error) {
      if(error instanceof Error) logWriter(error)
      return null
    } finally {
      this.pc.$disconnect()
    }
  }

  async save({id, nome, saldo, meta, compartilhada}: Carteira): Promise<void> {
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
      if(error instanceof Error) logWriter(error)
      throw new AdapterRepoError("Erro ao atualizar a carteira")
    }
  }
}