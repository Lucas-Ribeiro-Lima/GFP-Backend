import { Router  } from "express";
import { controllerDespesa } from "../configs/controllers.ts"

export const routeDespesa = Router()


routeDespesa.get("/", (req, res) => {
  res.json({
    message: "Rota com serviços relacionados a despesa"
  })
})

/**
 * @openapi
 * /despesa/buscar:
 *  post:
 *    summary: Busca todas as despesas da carteira
 *    tags:
 *      - Despesas
 *    description: Buscar todas as despesas conforme o Id da carteira
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            idCarteira: 1
 *    responses:
 *      200:
 *        description: Retorna todas as despesas da carteira
 *      404:
 *        description: Retorna um array vazio
 *      500: 
 *        description: Erro interno
 */
routeDespesa.post("/buscar", async (req, res, next) => {
  try {
    await controllerDespesa.handleHttpGet(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /despesa/criar:
 *  post:
 *    summary: Cria uma despesa
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Despesas
 *    description: Cria uma despesa para determinada carteira
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            idCarteira: 1
 *    responses:
 *      200:
 *        description: Despesa criada com sucesso
 *      500: 
 *        description: Erro interno
 */
routeDespesa.post("/criar", async(req, res, next) => {
  try {
    await controllerDespesa.handleHttpPost(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /despesa/atualizar:
 *  patch:
 *    summary: Atualiza uma despesa
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Despesas
 *    description: Atualiza uma despesa baseada no uuid
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            uuid: 00000000-0000-0000-0000-000000000000
 *    responses:
 *      200:
 *        description: Retorna todas as despesas da carteira
 *      404:
 *        description: Retorna um array vazio
 *      500: 
 *        description: Erro interno
 */
routeDespesa.patch("/atualizar", async (req, res, next) => {
  try {
    await controllerDespesa.handleHttpPatch(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /despesa/excluir:
 *  delete:
 *    summary: Exclui uma despesa
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Despesas
 *    description: Exclui uma despesa baseada no UUID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            uuid: 00000000-0000-0000-0000-000000000000
 *    responses:
 *      204:
 *        description: Despesa excluida com sucesso
 *      500: 
 *        description: Erro interno
 */
routeDespesa.delete("/excluir", async (req, res, next) => {
  try {
    await controllerDespesa.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})