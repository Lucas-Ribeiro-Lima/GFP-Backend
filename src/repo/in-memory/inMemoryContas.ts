import { Conta } from "../../entities/Conta.ts";
import { ContaRepo } from "../ContaRepo.ts";

export class InMemoryContas implements ContaRepo {
  public contasArray: Conta[] = []

  async create(conta: Conta): Promise<void> {
    const id = this.contasArray.length
    conta.id = id
    this.contasArray.push(conta)
  }

  async find(email: string): Promise<Conta | null> {
    return this.contasArray.find((conta) => conta.email === email) ?? null
  }

  async save(updatedConta: Conta): Promise<void> {
    const index = this.contasArray.findIndex((i) => i.email === updatedConta.email)
    this.contasArray[index] = updatedConta
  }

  async delete(email: string): Promise<void> {
    this.contasArray.filter((cont) => cont.email !== email)
  }
}