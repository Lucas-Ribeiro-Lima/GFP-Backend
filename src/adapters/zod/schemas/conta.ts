import { z } from 'zod'

export const contaSchema = z.object({
  id: z.coerce.number({message: "Id inválido"}),
  nome: z.string({ message: "Nome inválido"}),
  email: z.string().optional(),
  cpf: z.coerce.string().optional(),
  configs: z.object({
    tema: z.enum(["Light", "Dark"]).default("Light"),
    displayName: z.string().optional(),
    customWpp: z.string().optional()
  })
})

export const contaCriarSchema = z.object({
  nome: z.string({ message: "Nome inválido"}),
  email: z.string({ message: "Email obrigatório"}),
})