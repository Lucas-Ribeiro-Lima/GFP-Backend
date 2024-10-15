import { randomUUID } from "crypto";
import { Despesa } from "@/entities/Despesa.ts";
import { Renda } from "@/entities/Renda.ts";
import { DespesaRepo, RendaRepo } from "@/adapters/repo/RegistrosRepo.ts";

export class InMemoryRendas implements RendaRepo {
  public RendaArray: Renda[] = []

  async create(reg: Renda): Promise<void> {
    const newUuid = randomUUID()
    reg.uuid = newUuid
    this.RendaArray.push(reg)
  }

  async load(id_carteira: number): Promise<Renda[]> {
    return this.RendaArray.filter((reg) => reg.idCarteira === id_carteira) ?? []
  }

  async delete(uuid: string): Promise<void> {
    this.RendaArray = this.RendaArray.filter((reg) => reg.uuid !== uuid)
  }

  async save(renda: Renda): Promise<void> {
    const index = this.RendaArray.findIndex((reg) => reg.uuid === renda.uuid)
    if (index === -1) throw new Error ("Renda não encontrada")
    this.RendaArray[index] = renda
  }
}

export class InMemoryDespesas implements DespesaRepo {
  public DespesaArray: Despesa[] = []

  async create(reg: Despesa): Promise<void> {
    this.DespesaArray.push(reg)
  }

  async load(id_carteira: number): Promise<Despesa[]> {
    return this.DespesaArray.filter((reg) => reg.idCarteira === id_carteira)
  }

  async delete(uuid: string): Promise<void> {
    this.DespesaArray = this.DespesaArray.filter((reg) => reg.uuid !== uuid)
  }

  async save(despesa: Despesa): Promise<void> {
    const index = this.DespesaArray.findIndex((reg) => reg.uuid === despesa.uuid)
    if(index === -1) throw new Error("Despesa não encontrada")
    this.DespesaArray[index] = despesa
  }
}