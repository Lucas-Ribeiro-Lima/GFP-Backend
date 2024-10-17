import { env } from 'process'
import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "Database URL não está presente"),
  EXPRESS_HOST: z.string().min(1, "Servidor da aplicação não especificado"),
  EXPRESS_PORT: z.string().min(1, "Porta da API não especificada")
})


export const envs = envSchema.parse(env)

