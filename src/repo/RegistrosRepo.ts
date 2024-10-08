import { Despesa } from "../entities/Despesa.ts";
import { Registro } from "../entities/Registro.ts";
import { Renda } from "../entities/Renda.ts";

interface RegistrosRepo {
  create(registro: Registro): Promise<void>
  load(id_carteira: number): Promise<Registro[]>
  save(registro: Registro): Promise<void>
  delete(uuid: string): Promise<void>
}

export interface RendaRepo extends RegistrosRepo {
  create(registro: Renda): Promise<void>
  save(registro: Renda): Promise<void>
}

export interface DespesaRepo extends RegistrosRepo {
  create(registro: Despesa): Promise<void>
  save(registro: Despesa): Promise<void>
}