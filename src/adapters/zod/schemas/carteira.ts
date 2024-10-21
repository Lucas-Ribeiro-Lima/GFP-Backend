import { z } from 'zod'

export const carteiraSchema = z.object({
  id: z.coerce.number({message: "Id da carteira obrigatório"}),
  idContaDono: z.coerce.number({message: "Id do dono da carteira obrigatório"}),
  nome: z.string().default("Padrão"),
  saldo: z.coerce.number().default(0.00),
  compartilhada: z.boolean().default(false),
  idGrupoEconomico: z.nullable(z.number()),
  meta: z.coerce.number().default(0.00)
})

export const carteiraIdContaDonoSchema = z.object({
  idContaDono: z.coerce.number({message: "Id do dono da carteira obrigatório"}),
})

export const carteiraIdSchema = z.object({
  id: z.coerce.number({message: "Id da carteira obrigatório"}),
})