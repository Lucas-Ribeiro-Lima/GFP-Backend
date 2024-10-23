import { DespesaProps } from "@/entities/Despesa.ts";
import { RendaProps } from "@/entities/Renda.ts";
import { DespesaRepo, RendaRepo } from "@/useCases/repo/RegistrosRepo.ts";
import { AdapterRepoError } from "../../../errors/customErrors.ts";

export class InMemoryRendas implements RendaRepo {
  public RendaArray: RendaProps[] = []

  async create(reg: RendaProps): Promise<void> {
    this.RendaArray.push(reg)
  }

  async load(idCarteira: number): Promise<RendaProps[]> {
    return this.RendaArray.filter((reg) => reg.idCarteira === idCarteira) ?? []
  }

  async delete(uuid: string): Promise<void> {
    this.RendaArray = this.RendaArray.filter((reg) => reg.uuid !== uuid)
  }

  async save(renda: RendaProps): Promise<void> {
    const index = this.RendaArray.findIndex((reg) => reg.uuid === renda.uuid)
    if (index === -1) throw new AdapterRepoError("Renda não encontrada")
    this.RendaArray[index] = renda
  }
}

export class InMemoryDespesas implements DespesaRepo {
  public DespesaArray: DespesaProps[] = []

  async create(reg: DespesaProps): Promise<void> {
    this.DespesaArray.push(reg)
  }

  async load(id_carteira: number): Promise<DespesaProps[]> {
    return this.DespesaArray.filter((reg) => reg.idCarteira === id_carteira)
  }

  async save(despesa: DespesaProps): Promise<void> {
    const index = this.DespesaArray.findIndex((reg) => reg.uuid === despesa.uuid)
    if(index === -1) throw new AdapterRepoError("Despesa não encontrada")
    this.DespesaArray[index] = despesa
  }
  
  async delete(uuid: string): Promise<void> {
    this.DespesaArray = this.DespesaArray.filter((reg) => reg.uuid !== uuid)
  }

}