import { PrismaClient } from "@prisma/client";
import { Configs } from "../../../entities/Config.ts";
import { Conta } from "../../../entities/Conta.ts";
import { ContaRepo } from "../../../adapters/repo/ContaRepo.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";
import { logWriter } from "../../../lib/utils.ts";

export class PrismaConta implements ContaRepo {
  constructor(private pc = new PrismaClient({ log: ["error"], errorFormat: "pretty"})) {}

  async create({ nome, email, cpf, configs: {tema, customWpp, displayName} }: Conta): Promise<void> {
    try {
      await this.pc.conta.create({
        data: {
          nome,
          cpf,
          email,
          tema,
          displayName,
          customWpp
        }
      });
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

  async find(email: string): Promise<Conta | null> {
    try {
      const prismaResponse = await this.pc.conta.findUnique({
        where: {
          email
        }
      });
      if(!prismaResponse)  return null

      const { id, nome, cpf, tema, displayName, customWpp } = prismaResponse
      const configs = new Configs({ tema, displayName, customWpp });
      const conta = new Conta({
        id,
        nome,
        email,
        cpf,
        configs
      });
      return conta;
    } catch (error) {
      if(error instanceof Error) logWriter(error)
      return null
    } finally {
      await this.pc.$disconnect();
    }
  }

  async save({ nome, email, cpf, configs: { tema, displayName, customWpp } }: Conta): Promise<void> {
    try {
      await this.pc.conta.update({
        data: {
          nome,
          cpf,
          tema,
          displayName,
          customWpp
        },
        where: {
          email
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
