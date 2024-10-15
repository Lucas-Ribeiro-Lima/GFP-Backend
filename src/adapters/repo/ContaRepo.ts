import { Conta } from "../../entities/Conta.ts";

export interface ContaRepo {
  create(conta: Conta): Promise<void>
  find(email: string): Promise<Conta | null>
  save(conta: Conta): Promise<void>
  delete(email: string): Promise<void>
}