import { PrismaClient } from "@prisma/client";
import { Configs } from "@/entities/Config.ts";
import { Conta } from "@/entities/Conta.ts";
import { ContaRepo } from "@/adapters/repo/ContaRepo.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";

export class PrismaConta implements ContaRepo {
  constructor(private pc = new PrismaClient({ log: ["error"], errorFormat: "pretty"})) {}

  async create({ nome, email, cpf, provider, configs: {tema, customWpp, displayName} }: Conta): Promise<void> {
    try {
      await this.pc.conta.create({
        data: {
          nome,
          cpf,
          email,
          provider,
          tema,
          displayName,
          customWpp
        }
      });
    } catch (error) {
      console.error(error);
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
      console.error(error);
      throw new AdapterRepoError("Erro ao deletar conta no banco de dados");
    } finally {
      await this.pc.$disconnect();
    }
  }

  async find(email: string): Promise<Conta | null> {
    try {
      const { id, nome, cpf, provider, tema, displayName, customWpp } = await this.pc.conta.findUniqueOrThrow({
        where: {
          email
        }
      });

      const configs = new Configs({ tema, displayName, customWpp });
      const conta = new Conta({
        id,
        nome,
        email,
        cpf,
        provider,
        configs
      });

      return conta;
    } catch (error) {
      console.error(error);
      return null
    } finally {
      await this.pc.$disconnect();
    }
  }

  async save({ nome, email, cpf, provider, configs: { tema, displayName, customWpp } }: Conta): Promise<void> {
    try {
      await this.pc.conta.update({
        data: {
          nome,
          cpf,
          provider,
          tema,
          displayName,
          customWpp
        },
        where: {
          email
        }
      });
    } catch (error) {
      console.error(error);
      throw new AdapterRepoError("Erro ao salvar a conta no banco de dados");
    } finally {
      await this.pc.$disconnect();
    }
  }
}
