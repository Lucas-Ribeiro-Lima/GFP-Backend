import { ContaProps } from "@/entities/Conta.ts";
import { ContaRepo } from "@/useCases/repo/ContaRepo.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";

export class InMemoryContas implements ContaRepo {
  public contasArray: ContaProps[] = []

  async create({nome, email, cpf, configs}: ContaProps): Promise<number> {
    const id = this.contasArray.length
    this.contasArray.push({id, nome, email, cpf, configs})
    return id 
  }

  async find(id: number): Promise<ContaProps | null> {
    return this.contasArray.find((conta) => conta.id === id) ?? null
  }

  async findEmail(email: string): Promise<ContaProps | null> {
    return this.contasArray.find((conta) => conta.email === email) ?? null
  }

  async save(updatedConta: ContaProps): Promise<void> {
    const index = this.contasArray.findIndex((i) => i.email === updatedConta.email)
    if(index === -1) throw new AdapterRepoError("Conta not found")
    this.contasArray[index] = updatedConta
  }

  async delete(email: string): Promise<void> {
    this.contasArray = this.contasArray.filter((cont) => cont.email !== email)
  }
}