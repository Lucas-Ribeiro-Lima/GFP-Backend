import { Registro } from "../../entities/Registro.ts";
import { Renda } from "../../entities/Renda.ts";
import { RendaRepo } from "../RegistrosRepo.ts";

export class InMemoryRendas implements RendaRepo {
  public RendaArray: Renda[] = []

  async create(registro: Renda): Promise<void> {
    this.RendaArray.push(registro)
  }
  async read(id_carteira: number): Promise<Registro[]> {
    return this.RendaArray.filter((registro) => registro.idCarteira === id_carteira)
  }
  async delete(uuid: string): Promise<void> {
    this.RendaArray = this.RendaArray.filter((registro) => registro.uuid !== uuid)
  }
  async save(registro: Renda): Promise<void> {
    const index = this.RendaArray.findIndex(() => registro.uuid)
    if (index === -1) throw new Error ("Registro não encontrado")
    this.RendaArray[index] = registro
  }
}