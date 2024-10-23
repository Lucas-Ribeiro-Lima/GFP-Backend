import { ContaProps } from "@/entities/Conta.ts";

export interface ContaRepo {
  create(conta: ContaProps): Promise<number>
  find(id: number): Promise<ContaProps | null>
  findEmail(email: string): Promise<ContaProps | null>
  save(conta: ContaProps): Promise<void>
  delete(email: string): Promise<void>
}