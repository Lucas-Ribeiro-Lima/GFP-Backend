import { Despesa } from "../../entities/Despesa.ts";
import { Registro } from "../../entities/Registro.ts";
import { Renda } from "../../entities/Renda.ts";

interface RegistrosRepo<T> {
  create(registro: Registro): Promise<void>
  load(idCarteira: number): Promise<T[] | []>
  save(registro: Registro): Promise<void>
  delete(uuid: string): Promise<void>
}

export interface RendaRepo extends RegistrosRepo<Renda> {
  create(registro: Renda): Promise<void>
  save(registro: Renda): Promise<void>
}

export interface DespesaRepo extends RegistrosRepo<Despesa> {
  create(registro: Despesa): Promise<void>
  save(registro: Despesa): Promise<void>
}