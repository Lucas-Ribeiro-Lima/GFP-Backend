import { z } from "zod";

export const despesaSchema = z.object({
  uuid: z.string().length(36, "UUID inválido"),
  idCarteira: z.number(),
  valor: z.number(),
  descricao: z.string(),
  modalidade: z.enum(["fixo", "variavel"]),
  categoria: z.enum(["alimentacao", "moradia", "lazer", "outros"]),
  parcelado: z.boolean().default(false),
  numParcelas: z.number().default(1),
  competencia: z.object({
    mes: z.number().min(1, "Mês invalido").max(new Date().getMonth() + 1),
    ano: z.number().min(1900, "Ano inválido"). max(new Date().getFullYear()),
    dataInclusao: z.date()
  })
})

export const rendaSchema = z.object({
  uuid: z.string().length(36, "UUID inválido"),
  idCarteira: z.number(),
  valor: z.number(),
  descricao: z.string(),
  modalidade: z.enum(["fixo", "variavel"]),
  categoria: z.enum(["salario", "investimento", "bonus", "outros"]),
  fonte: z.string().optional(),
  frequencia: z.enum(["mensal", "trimestral", "semestral", "anual"]),
  competencia: z.object({
    mes: z.number().min(1, "Mês invalido").max(new Date().getMonth() + 1),
    ano: z.number().min(1900, "Ano inválido"). max(new Date().getFullYear()),
    dataInclusao: z.date()
  })
})

export const uuidSchema = z.object({
  uuid: z.string().length(36)
})

export const idCarteiraSchema = z.object({
  idCarteira: z.number()
})
