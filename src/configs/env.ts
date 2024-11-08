import { env } from 'process'
import z from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string({message: "Database URL não está presente"}).default("mysql://gfp:gfp@mysql:3306/gfp"),
  REDIS_URL: z.string({message: "String de conexão com Redis obrigatória"}).default("redis://@redis:6379"),
  EXPRESS_HOST: z.string().default("localhost"),
  EXPRESS_PORT: z.string().default("5000"),
  SESSION_SECRET: z.string({message: "Segredo para sessões obrigatório"}),
  GOOGLE_CLIENT_ID: z.string({ message: "Client API OAuth não está presente"}),
  GOOGLE_CLIENT_SECRET: z.string({ message :"Client secret não está presente"}),
  CALLBACK_DOMAIN: z.string().default(`http://localhost:5000`),
  REDIRECT_FRONTEND_URL: z.string().default(`http://localhost:5000/`),
  GFP_COOKIE_DOMAIN: z.string().default("localhost"),
  CORS_ALLOWED_ORIGIN: z.string().default("*"),
})

export const envs = envSchema.parse(env)

