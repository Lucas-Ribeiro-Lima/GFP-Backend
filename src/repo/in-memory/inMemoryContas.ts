import { Conta } from "../../entities/Conta.ts";
import { ContaRepo } from "../ContaRepo.ts";

export class inMemoryContas implements ContaRepo {
  public contasArray: Conta[] = []

  async create(conta: Conta): Promise<void> {
    this.contasArray.push(conta)
  }

  async find(email: string): Promise<Conta> {
    const find = this.contasArray.find((conta) => conta.email === email)
    if(!find) throw new Error("Conta não encontrada")
    return find
  }

  async save(updatedConta: Conta): Promise<void> {
    const index = this.contasArray.findIndex((conta) => conta.email === updatedConta.email)
    if(index === -1) throw new Error("Conta não encontrada")
    this.contasArray[index] = updatedConta
  }

  async delete(email: string): Promise<void> {
    this.contasArray.filter((cont) => cont.email !== email)
  }
}