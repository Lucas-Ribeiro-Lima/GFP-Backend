import { Carteira } from '@/entities/Carteira.ts';
import { PrismaClient } from '@prisma/client';
import { CarteiraRepo } from '../CarteiraRepo.ts';


export class PrismaCarteira implements CarteiraRepo {
  constructor(private pc = new PrismaClient({log: ['error'], errorFormat: 'pretty'})) {}

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
      console.log(error)
      throw new Error("Erro ao criar carteira no banco de dados")
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
      console.log(error)
      throw new Error("Erro ao deletar carteira do banco de dados")
    }
  }

  async find(id_dono: number): Promise<Carteira | null> {
    try {
      const { id, idContaDono, idGrupoEconomico, nome, saldo, compartilhada, meta} = await this.pc.carteira.findFirstOrThrow({
        where: {
          idContaDono: id_dono
        }
      })

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
      console.error(error)
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
      console.log(error)
      throw new Error("Erro ao atualizar a carteira")
    }
  }
}