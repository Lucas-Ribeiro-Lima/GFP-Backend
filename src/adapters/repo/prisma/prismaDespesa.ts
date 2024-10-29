import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { DespesaProps } from "../../../entities/Despesa.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";
import { DespesaRepo } from "../../../useCases/repo/RegistrosRepo.ts";
import { logger } from "../../../lib/utils.ts";

export class PrismaDespesa implements DespesaRepo {
  constructor(private pc = new PrismaClient({log: ["error"], errorFormat: "pretty"})) {}

  async create({
    idCarteira,
    modalidade,
    valor,
    descricao,
    parcelado,
    numParcelas,
    competencia: { ano, mes }
  }: DespesaProps): Promise<void> {
    await this.pc.registro.create({
      data: {
        uuid: randomUUID(),
        tipo: "despesa",
        idCarteira,
        descricao,
        valor,
        modalidade,
        parcelado,
        numParcelas,
        categoria: "outros",
        competenciaMes: mes,
        competenciaAno: ano,
      }
    })
  }

  async delete(uuid: string): Promise<void> {
    try {
      await this.pc.registro.delete({
        where: {
          uuid
        }
      })
    } catch (error) {
      console.log(error)
      throw new AdapterRepoError("Erro ao deletar a despesa do banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }

  async load(idCarteira: number): Promise<DespesaProps[] | []> {
    try {
      const prismaResponse = await this.pc.registro.findMany({
        where: {
          idCarteira,
          tipo: "despesa"
        }
      })
      if(!prismaResponse) return []

      const response = prismaResponse.map(despesa => {
        if (despesa.categoria !== 'alimentacao' && 
          despesa.categoria !== 'moradia' && 
          despesa.categoria !== 'lazer' && 
          despesa.categoria !== 'outros') {
        throw new Error("Categoria de despesa inválida");
        }
        return {
          uuid: despesa.uuid,
          idCarteira: idCarteira,
          descricao: despesa.descricao,
          valor: despesa.valor,
          modalidade: despesa.modalidade,
          parcelado: despesa.parcelado,
          numParcelas: despesa.numParcelas,
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
      throw new AdapterRepoError("Erro ao carregar os registros de despesa da carteira")
    }
  }

  async save({uuid , categoria, modalidade, valor, descricao, parcelado, numParcelas, competencia: { ano, mes }}: DespesaProps): Promise<void> {
    try {
      await this.pc.registro.update({
        data: {
          valor,
          descricao,
          categoria,
          modalidade,
          parcelado,
          numParcelas,
          competenciaMes: mes,
          competenciaAno: ano
        },
        where: {
          uuid
        }
      })
    } catch (error) {
      if(error instanceof Error) logger.error(error)
      throw new AdapterRepoError("Erro ao salvar o registro de despesa no banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }
}