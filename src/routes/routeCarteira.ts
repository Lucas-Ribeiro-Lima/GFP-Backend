import { Router } from "express";
import { controllerCarteira } from '../configs/controllers.ts'

export const routeCarteira = Router()


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
 *            idDono: 1
 *    responses:
 *      200:
 *        description: Retorna a carteira especificada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.post("/buscar", async (req, res, next) => {
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
 *            idDono: 1
 *    responses:
 *      200:
 *        description: Retorna a carteira especificada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.post("/criar", async (req, res, next) => {
  try {
    await controllerCarteira.handleHttpPatch(req, res)
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
 *            idDono: 1
 *    responses:
 *      201:
 *        description: Atualiza a carteira especificada
 *      404:
 *        description: Carteira não encotrada
 *      500: 
 *        description: Erro interno
 */
routeCarteira.patch("/atualizar", async (req, res, next) => {
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
 *            idDono: 1
 *    responses:
 *      204:
 *        description: Exclui a carteira solicitada
 *      404:
 *        description: Retorna nulo
 *      500: 
 *        description: Erro interno
 */
routeCarteira.delete("/excluir", async (req, res, next) => {
  try {
    await controllerCarteira.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})