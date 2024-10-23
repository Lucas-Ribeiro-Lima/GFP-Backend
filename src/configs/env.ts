import { env } from 'process'
import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string({message: "Database URL não está presente"}),
  REDIS_URL: z.string({message: "String de conexão com Redis obrigatória"}),
  EXPRESS_HOST: z.string().default("localhost"),
  EXPRESS_PORT: z.string().default("5000"),
  SESSION_SECRET: z.string({message: "Segredo para sessões obrigatório"}),
  GOOGLE_CLIENT_ID: z.string({ message: "Client API OAuth não está presente"}),
  GOOGLE_CLIENT_SECRET: z.string({ message :"Client secret não está presente"}),
  DOMAIN: z.string().default(`http://localhost:5000`)
})

export const envs = envSchema.parse(env)

