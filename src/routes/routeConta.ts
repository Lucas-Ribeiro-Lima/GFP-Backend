import { Router } from 'express'
import { controllerConta } from '../configs/controllers.ts'
import { requestBodyValido } from '../lib/middlewares/validacoes.ts'

export const routeConta = Router()

routeConta.get("/", async (req, res) => {
  res.json({
    path: "Serviços relacionados a conta"
  })
})

/**
 * @openapi
 * /conta/buscar:
 *  post:
 *    tags:
 *      - Contas
 *    summary: Recupera uma conta
 *    description: Endpoint para recuperação de contas baseado no e-mail
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            email: johndoe@doe.uk
 *    responses:
 *      200:
 *         description: Retorna a conta solicitada.
 *      404:
 *         description: Returna null se não exister uma conta com o e-mail.
 */
routeConta.post("/buscar", requestBodyValido, async (req, res, next) => {
  try {
    await controllerConta.handleHttpGet(req,res)
  } catch (error) {
    next(error)
  }
})


