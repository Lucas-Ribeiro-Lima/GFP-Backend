import { DespesaProps } from "@/entities/Despesa.ts";
import { RegistroProps } from "@/entities/Registro.ts";
import { RendaProps } from "@/entities/Renda.ts";

interface RegistrosRepo<T> {
  create(registro: RegistroProps): Promise<void>
  load(idCarteira: number): Promise<T[] | []>
  save(registro: RegistroProps): Promise<void>
  delete(uuid: string): Promise<void>
}

export interface RendaRepo extends RegistrosRepo<RendaProps> {
  create(registro: RendaProps): Promise<void>
  save(registro: RendaProps): Promise<void>
}

export interface DespesaRepo extends RegistrosRepo<DespesaProps> {
  create(registro: DespesaProps): Promise<void>
  save(registro: DespesaProps): Promise<void>
}