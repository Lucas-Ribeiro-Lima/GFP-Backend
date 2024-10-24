import { Router } from "express";
import { controllerCarteira } from '../configs/controllers.ts'
import { requestBodyValido, requiredBodyProps } from "../lib/middlewares/validacoesHttp.ts";
import { carteiraIdContaDonoSchema, carteiraIdSchema, carteiraSchema } from '../adapters/zod/schemas/carteira.ts'
import { isAuthenticated } from "../lib/middlewares/authentication.ts";

export const routeCarteira = Router()

const requiredPropIdContaDono = requiredBodyProps(carteiraIdContaDonoSchema)
const requiredPropCarteira = requiredBodyProps(carteiraSchema, "carteira")
const requiredPropId = requiredBodyProps(carteiraIdSchema)


routeCarteira.get("/", (req, res) => {
  res.json({message: "Rota com serviços relacionados a carteira"})
})

/**
 * @openapi
 * /carteira/buscar:
 *  post:
 *    summary: Busca uma carteira
 *    tags:
 *      - Carteira
 *    description: Buscar uma carteira conforme o Id do dono
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            idContaDono: 1
 *    responses:
 *      200:
 *        description: Retorna a carteira especificada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.post("/buscar", isAuthenticated, requestBodyValido, requiredPropIdContaDono, async (req, res, next) => {
  try {
    await controllerCarteira.handleHttpGet(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /carteira/criar:
 *  post:
 *    summary: Criar uma carteira
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Carteira
 *    description: ""
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            carteira:
 *              id: 1
 *              idContaDono: 1
 *              nome: Carteira John Doe
 *              saldo: 0.00
 *              compartilhada: false
 *              idGrupoEconomico: null
 *              meta: 0.00
 *    responses:
 *      200:
 *        description: Retorna a carteira especificada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.post("/criar", isAuthenticated, requestBodyValido, requiredPropCarteira, async (req, res, next) => {
  try {
    await controllerCarteira.handleHttpPost(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /carteira/atualizar:
 *  patch:
 *    summary: Atualiza uma carteira
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Carteira
 *    description: ""
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            carteira:
 *              id: 1
 *              idContaDono: 1
 *              nome: Carteira Doe John pessoal
 *              saldo: 10.00
 *              compartilhada: false
 *              idGrupoEconomico: null
 *              meta: 0.00
 *    responses:
 *      201:
 *        description: Atualiza a carteira especificada
 *      404:
 *        description: Carteira não encotrada
 *      500: 
 *        description: Erro interno
 */
routeCarteira.patch("/atualizar", isAuthenticated, requestBodyValido, requiredPropCarteira,async (req, res, next) => {
  try {
    await controllerCarteira.handleHttpPatch(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /carteira/excluir:
 *  delete:
 *    summary: Deleta uma carteira
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Carteira
 *    description: Deleta uma carteira conforme o Id do dono
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            id: 1
 *    responses:
 *      204:
 *        description: Exclui a carteira solicitada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.delete("/excluir", isAuthenticated, requestBodyValido, requiredPropId, async (req, res, next) => {
  try {
    await controllerCarteira.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})