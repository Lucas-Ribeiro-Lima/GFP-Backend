import { Router  } from "express";
import { controllerRenda } from "../configs/controllers.ts"

export const routeRenda = Router()


routeRenda.get("/", (req, res) => {
  res.json({
    message: "Rota com serviços relacionados a renda"
  })
})

/**
 * @openapi
 * /renda/buscar:
 *  post:
 *    summary: Busca todas as renda da carteira
 *    tags:
 *      - Rendas
 *    description: Buscar todas as renda conforme o Id da carteira
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            idCarteira: 1
 *    responses:
 *      200:
 *        description: Retorna todas as renda da carteira
 *      404:
 *        description: Retorna um array vazio
 *      500: 
 *        description: Erro interno
 */
routeRenda.post("/buscar", async (req, res, next) => {
  try {
    await controllerRenda.handleHttpGet(req, res)
  } catch (error) {
    next(error)
  }
})


/**
 * @openapi
 * /renda/criar:
 *  post:
 *    summary: Cria uma renda
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Rendas
 *    description: Cria uma renda para determinada carteira
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            renda:
 *             uuid: 00000000-0000-0000-0000-000000000000
 *             idCarteira: 1
 *             descricao: Renda 1
 *             fonte: Swagger
 *             valor: 2100.0
 *             categoria: salario
 *             modalidade: fixo
 *             frequencia: mensal
 *             competencia: 
 *                mes: 10
 *                ano: 2024
 *                dataInclusao: 18/10/2024
 *    responses:
 *      200:
 *        description: Despesa criada com sucesso
 *      500: 
 *        description: Erro interno
 */
routeRenda.post("/criar", async(req, res, next) => {
  try {
    await controllerRenda.handleHttpPost(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /renda/atualizar:
 *  patch:
 *    summary: Atualiza uma renda
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Rendas
 *    description: Atualiza uma renda baseada no uuid
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            renda:
 *             uuid: 00000000-0000-0000-0000-000000000000
 *             idCarteira: 1
 *             descricao: Renda Alterada
 *             fonte: Swagger
 *             valor: 2100.0
 *             categoria: salario
 *             modalidade: fixo
 *             frequencia: mensal
 *             competencia: 
 *                mes: 10
 *                ano: 2024
 *                dataInclusao: 18/10/2024
 *    responses:
 *      200:
 *        description: Retorna todas as rendas da carteira
 *      404:
 *        description: Retorna um array vazio
 *      500: 
 *        description: Erro interno
 */
routeRenda.patch("/atualizar", async (req, res, next) => {
  try {
    await controllerRenda.handleHttpPatch(req, res)
  } catch (error) {
    next(error)
  }
})


/**
 * @openapi
 * /renda/excluir:
 *  delete:
 *    summary: Exclui uma renda
 *    security:
 *      - openIdConnect: []
 *    tags:
 *      - Rendas
 *    description: Exclui uma renda baseada no UUID
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            uuid: 00000000-0000-0000-0000-000000000000
 *    responses:
 *      204:
 *        description: Renda excluida com sucesso
 *      500: 
 *        description: Erro interno
 */
routeRenda.delete("/excluir", async (req, res, next) => {
  try {
    await controllerRenda.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})