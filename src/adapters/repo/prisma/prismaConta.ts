import { PrismaClient } from "@prisma/client";
import { ContaProps } from "../../../entities/Conta.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";
import { logWriter } from "../../../lib/utils.ts";
import { ContaRepo } from "../../../useCases/repo/ContaRepo.ts";

export class PrismaConta implements ContaRepo {
  constructor(private pc = new PrismaClient({ log: ["error"], errorFormat: "pretty"})) {}

  async create({ nome, email, cpf, configs: {tema, customWpp, displayName} }: ContaProps): Promise<number> {
    try {
      const response = await this.pc.conta.create({
        data: {
          nome,
          cpf,
          email,
          tema,
          displayName,
          customWpp
        }
      });
      return response.id
    } catch (error) {
      if(error instanceof Error) logWriter(error)
      throw new AdapterRepoError("Erro ao criar conta no banco de dados");
    } finally {
      await this.pc.$disconnect();
    }
  }

  async delete(email: string): Promise<void> {
    try {
      await this.pc.conta.delete({
        where: {
          email
        }
      });
    } catch (error) {
      if(error instanceof Error) logWriter(error)
      throw new AdapterRepoError("Erro ao deletar conta no banco de dados");
    } finally {
      await this.pc.$disconnect();
    }
  }

  async find(id: number): Promise<ContaProps | null> {
    try {
      const prismaResponse = await this.pc.conta.findUnique({
        where: {
          id
        }
      });
      if(!prismaResponse) return null
      const { nome, email, cpf, tema, customWpp, displayName} = prismaResponse
      const configs = { tema, displayName, customWpp }
      const conta = {id, nome, email, cpf, configs}
      return conta
    } catch (error) {
      if(error instanceof Error) logWriter(error)
      return null
    } finally {
      await this.pc.$disconnect();
    }
  }

  async findEmail(email: string): Promise<ContaProps | null> {
    try {
      const prismaResponse = await this.pc.conta.findUnique({
        where: {
          email
        }
      });
      if(!prismaResponse)  return null

      const { id, nome, cpf, tema, displayName, customWpp } = prismaResponse
      const configs = { tema, displayName, customWpp }
      const conta = {id, nome, email, cpf, configs}
      return conta;
    } catch (error) {
      if(error instanceof Error) logWriter(error)
      return null
    } finally {
      await this.pc.$disconnect();
    }
  }

  async save({ id, nome, email, cpf, configs: { tema, displayName, customWpp } }: ContaProps): Promise<void> {
    try {
      await this.pc.conta.update({
        data: {
          nome,
          email,
          cpf,
          tema,
          displayName,
          customWpp
        },
        where: {
          id
        }
      });
    } catch (error) {
      if(error instanceof Error) logWriter(error)
      throw new AdapterRepoError("Erro ao salvar a conta no banco de dados");
    } finally {
      await this.pc.$disconnect();
    }
  }
}
