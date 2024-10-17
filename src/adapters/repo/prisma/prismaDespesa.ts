import { DespesaRepo } from "../../../adapters/repo/RegistrosRepo.ts";
import { Despesa } from "../../../entities/Despesa.ts";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { AdapterRepoError } from "../../../errors/customErrors.ts";

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
  }: Despesa): Promise<void> {
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

  async load(idCarteira: number): Promise<Despesa[]> {
    try {
      const response = await this.pc.registro.findMany({
        where: {
          idCarteira,
          tipo: "despesa"
        }
      })

      return response.map(({
        uuid,
        idCarteira,
        descricao,
        valor,
        // categoria,
        modalidade,
        parcelado,
        numParcelas,
        competenciaMes,
        competenciaAno,
        dataInclusao
      }) => new Despesa({
          uuid, 
          idCarteira,
          descricao, 
          valor, 
          categoria: "outros", 
          modalidade, 
          parcelado: parcelado ?? false, 
          numParcelas: numParcelas ?? 1, 
          competencia: 
            { mes: competenciaMes, ano: competenciaAno, dataInclusao: dataInclusao.toString() }
      }))
    } catch (error) {
      console.log(error)
      throw new AdapterRepoError("Erro ao carregar os registros de despesa da carteira")
    }
  }

  async save({uuid , categoria, modalidade, valor, descricao, parcelado, numParcelas, competencia: { ano, mes }}: Despesa): Promise<void> {
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
      console.log(error)
      throw new AdapterRepoError("Erro ao salvar o registro de despesa no banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }
}