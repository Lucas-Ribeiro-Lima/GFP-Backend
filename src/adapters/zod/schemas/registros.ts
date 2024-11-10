import { z } from "zod";

export const despesaSchema = z.object({
  uuid: z.string().length(36, "UUID inválido"),
  idCarteira: z.coerce.number(),
  valor: z.coerce.number(),
  descricao: z.string(),
  modalidade: z.enum(["fixo", "variavel"]),
  categoria: z.enum(["alimentacao", "moradia", "lazer", "outros"]),
  parcelado: z.coerce.boolean().default(false),
  numParcelas: z.coerce.number().default(1),
  competencia: z.object({
    mes: z.number().min(1, "Mês invalido").max(new Date().getMonth() + 1),
    ano: z.number().min(1900, "Ano inválido"). max(new Date().getFullYear()),
    dataInclusao: z.string().optional()
  })
})

export const rendaSchema = z.object({
  uuid: z.string().length(36, "UUID inválido"),
  idCarteira: z.coerce.number(),
  valor: z.coerce.number(),
  descricao: z.string(),
  modalidade: z.enum(["fixo", "variavel"]),
  categoria: z.enum(["salario", "investimento", "bonus", "outros"]),
  fonte: z.string().optional(),
  frequencia: z.enum(["mensal", "trimestral", "semestral", "anual"]),
  competencia: z.object({
    mes: z.number().min(1, "Mês invalido").max(new Date().getMonth() + 1),
    ano: z.number().min(1900, "Ano inválido"). max(new Date().getFullYear()),
    dataInclusao: z.string().optional()
  })
})

export const uuidSchema = z.object({
  uuid: z.string().length(36)
})
