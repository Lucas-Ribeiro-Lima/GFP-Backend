import { Router } from "express";
import { carteiraSchema } from '../adapters/zod/schemas/carteira.ts';
import { controllerCarteira } from '../configs/controllers.ts';
import { isAuthenticated } from "../lib/middlewares/authentication.ts";
import { requestBodyValido, requiredBodyProps } from "../lib/middlewares/validacoesHttp.ts";

export const routeCarteira = Router()

const requiredPropCarteira = requiredBodyProps(carteiraSchema, "carteira")


routeCarteira.get("/", (req, res) => {
  res.json({message: "Rota com serviços relacionados a carteira"})
})

/**
 * @openapi
 * /carteira/buscar:
 *  get:
 *    summary: Busca uma carteira
 *    tags:
 *      - Carteira
 *    description: Buscar uma carteira conforme o Id do dono
 *    responses:
 *      200:
 *        description: Retorna a carteira especificada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.get("/buscar", isAuthenticated, async (req, res, next) => {
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
 *    responses:
 *      204:
 *        description: Exclui a carteira solicitada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.delete("/excluir", isAuthenticated, async (req, res, next) => {
  try {
    await controllerCarteira.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})