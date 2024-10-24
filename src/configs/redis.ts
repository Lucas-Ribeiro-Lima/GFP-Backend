import RedisStore from "connect-redis";
import { createClient } from "redis";
import { envs } from './env.ts'

export const redisClient = await createClient({
  url: envs.REDIS_URL
})

await redisClient.connect()

export const redisStore = new RedisStore({
  client: redisClient,
  prefix: "gfp",
  ttl: 1000 * 60 * 60 // 1 hora
})