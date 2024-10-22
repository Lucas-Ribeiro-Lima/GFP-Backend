import { z } from 'zod'

export const contaSchema = z.object({
  id: z.coerce.number(),
  nome: z.string({ message: "Nome inválido"}),
  email: z.string({ message: "Email obrigatório"}),
  cpf: z.string({ message: "CPF obrigatório"}),
  configs: z.object({
    tema: z.enum(["Light", "Dark"]).default("Light"),
    displayName: z.string().optional(),
    customWpp: z.string().optional()
  })
})

export const contaEmailSchema = z.object({
  email: z.string({ message: "Email obrigatório"})
})

export const contaCriarSchema = z.object({
  nome: z.string({ message: "Nome inválido"}),
  email: z.string({ message: "Email obrigatório"}),
  cpf: z.string({ message: "CPF obrigatório"}),
})