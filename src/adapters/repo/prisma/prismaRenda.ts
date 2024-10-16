import { RendaRepo } from "@/adapters/repo/RegistrosRepo.ts";
import { Renda } from "@/entities/Renda.ts";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "crypto";
import { AdapterRepoError } from "../../../errors/customErrors.ts";

export class PrismaRenda implements RendaRepo {
  constructor(private pc = new PrismaClient({log: ["error"], errorFormat: "pretty"})) {}

  async create({idCarteira, descricao, categoria, valor, fonte, frequencia, competencia: { mes, ano }}: Renda): Promise<void> {
    try {
      await this.pc.registro.create({
        data: {
          uuid: randomUUID(),
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
      console.log(error)
      throw new Error("Erro ao deletar registro do banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }

  async load(idCarteira: number): Promise<Renda[]> {
    try {
      const response = await this.pc.registro.findMany({
        where: {
          idCarteira,
          tipo: "renda"
        },
      })

      return response.map(({
        uuid, 
        idCarteira, 
        modalidade,
        valor,
        fonte,
        frequencia, 
        descricao,
        // categoria, 
        competenciaMes, 
        competenciaAno, 
        dataInclusao}) => new Renda({
          uuid,
          idCarteira,
          modalidade,
          valor,
          fonte: fonte ?? "",
          frequencia,
          descricao,
          categoria: "outros",
          competencia: {
            mes: competenciaMes,
            ano: competenciaAno,
            dataInclusao: dataInclusao.toString()
          }
        }))
    } catch (error) {
      console.log(error)
      throw new AdapterRepoError("Erro ao carregar registros de renda da carteira")
    } finally {
      this.pc.$disconnect()
    }
  }

  async save({ uuid, modalidade, categoria, descricao, fonte, frequencia, valor, competencia: { ano, mes } }: Renda): Promise<void> {
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
      console.log(error)
      throw new AdapterRepoError("Erro ao salvar o registro de renda no banco de dados")
    } finally {
      this.pc.$disconnect()
    }
  }
}