import { Despesa } from "../../entities/Despesa.ts";
import { Registro } from "../../entities/Registro.ts";
import { Renda } from "../../entities/Renda.ts";
import { DespesaRepo, RendaRepo } from "../RegistrosRepo.ts";

export class InMemoryRendas implements RendaRepo {
  public RendaArray: Renda[] = []

  async create(reg: Renda): Promise<void> {
    this.RendaArray.push(reg)
  }

  async load(id_carteira: number): Promise<Registro[]> {
    return this.RendaArray.filter((reg) => reg.idCarteira === id_carteira)
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

  async load(id_carteira: number): Promise<Registro[]> {
    return this.DespesaArray.filter((reg) => reg.idCarteira === id_carteira)
  }

  async delete(uuid: string): Promise<void> {
    this.DespesaArray = this.DespesaArray.filter((reg) => reg.uuid !== uuid)
  }

  async save(Despesa: Despesa): Promise<void> {
    const index = this.DespesaArray.findIndex((reg) => reg.uuid === Despesa.uuid)
    if (index === -1) throw new Error ("Despesa não encontrado")
    this.DespesaArray[index] = Despesa
  }
}