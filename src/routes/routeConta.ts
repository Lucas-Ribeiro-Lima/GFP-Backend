import { Router } from 'express'
import { controllerConta } from '../configs/controllers.ts'
import { requestBodyValido } from '../lib/middlewares/validacoes.ts'

export const routeConta = Router()

/**
 * @openapi
 * /conta:
 *  get:
 *    description:
 */
routeConta.get("/", async (req, res) => {
  res.json({
    path: "Serviços relacionados a conta"
  })
})

/**
 * @openapi
 * /conta/buscar:
 *  post:
 *    description:
 */
routeConta.post("/buscar", requestBodyValido, async (req, res, next) => {
  try {
    await controllerConta.handleHttpGet(req,res)
  } catch (error) {
    next(error)
  }
})


