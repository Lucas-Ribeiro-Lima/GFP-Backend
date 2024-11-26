import { PrismaClient } from "@prisma/client";
import { RendaProps } from "../../../entities/Renda.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";
import { RendaRepo } from "../../../useCases/repo/RegistrosRepo.ts";
import { logger } from "../../../lib/utils.ts";

export class PrismaRenda implements RendaRepo {
  constructor(private readonly pc = new PrismaClient({log: ["error"], errorFormat: "pretty"})) {}

  async create({uuid, idCarteira, descricao, categoria, valor, fonte, frequencia, competencia: { mes, ano }}: RendaProps): Promise<void> {
    try {
      await this.pc.registro.create({
        data: {
          uuid,
          idCarteira,
          tipo: "renda",
          descricao,
          categoria,
          valor,
          fonte,
          frequencia,
          competenciaMes: mes,
          competenciaAno: ano,
        }
      })
    } catch (error) {
      console.error(error)
      throw new AdapterRepoError("Erro ao criar renda no banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }

  async delete(uuid: string): Promise<void> {
    try {
      await this.pc.registro.delete({
        where: {
          uuid
        }
      })
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new Error("Erro ao deletar registro do banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }

  async load(idCarteira: number): Promise<RendaProps[] | []> {
    try {
      const prismaResponse = await this.pc.registro.findMany({
        where: {
          idCarteira,
          tipo: "renda"
        },
      })

      const response = prismaResponse.map(despesa => {
        if (despesa.categoria !== 'salario' && 
          despesa.categoria !== 'investimento' && 
          despesa.categoria !== 'bonus' && 
          despesa.categoria !== 'outros') {
        throw new Error("Categoria de despesa inválida");
        }
        return {
          uuid: despesa.uuid,
          idCarteira: idCarteira,
          descricao: despesa.descricao,
          valor: despesa.valor,
          modalidade: despesa.modalidade,
          fonte: despesa.fonte,
          frequencia: despesa.frequencia,
          categoria: despesa.categoria,
          competencia: {
            mes: despesa.competenciaMes,
            ano: despesa.competenciaAno,
            dataInclusao: despesa.dataInclusao.toLocaleDateString("pt-BR")
          }
        }
      })
      
      return response
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao carregar registros de renda da carteira")
    } finally {
      this.pc.$disconnect()
    }
  }

  async save({ uuid, modalidade, categoria, descricao, fonte, frequencia, valor, competencia: { ano, mes } }: RendaProps): Promise<void> {
    try {
      await this.pc.registro.update({
        data: {
          valor,
          descricao,
          categoria,
          modalidade,
          fonte,
          frequencia,
          competenciaMes: mes,
          competenciaAno: ano,
        },
        where: {
          uuid
        }
      })
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao salvar o registro de renda no banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }
}