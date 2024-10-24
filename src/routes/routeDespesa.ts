import { Router } from "express";
import { despesaSchema, idCarteiraSchema, uuidSchema } from "../adapters/zod/schemas/registros.ts";
import { controllerDespesa } from "../configs/controllers.ts";
import { requestBodyValido, requiredBodyProps } from "../lib/middlewares/validacoesHttp.ts";
import { isAuthenticated } from "../lib/middlewares/authentication.ts";

export const routeDespesa = Router()

const requiredIdCarteira = requiredBodyProps(idCarteiraSchema)
const requiredUuid = requiredBodyProps(uuidSchema)
const requiredDespesa = requiredBodyProps(despesaSchema, "despesa")

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
routeDespesa.post("/buscar", isAuthenticated, requestBodyValido, requiredIdCarteira, async (req, res, next) => {
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
 *            despesa:
 *              uuid: 00000000-0000-0000-0000-000000000000
 *              idCarteira: 1
 *              valor: 50.25
 *              descricao: despesa 1
 *              modalidade: variavel
 *              categoria: outros
 *              parcelado: false
 *              numParcelas: 1
 *              competencia:
 *                  mes: 10
 *                  ano: 2024
 *                  dataInclusao: 18/10/2024
 *    responses:
 *      200:
 *        description: Despesa criada com sucesso
 *      500: 
 *        description: Erro interno
 */
routeDespesa.post("/criar", isAuthenticated, requestBodyValido, requiredDespesa, async(req, res, next) => {
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
 *            despesa:
 *             uuid: 00000000-0000-0000-0000-000000000000
 *             idCarteira: 1
 *             valor: 60.50
 *             descricao: despesa alterada
 *             modalidade: variavel
 *             categoria: outros
 *             parcelado: false
 *             numParcelas: 1
 *             competencia:
 *                mes: 10
 *                ano: 2024
 *                dataInclusao: 18/10/2024
 *    responses:
 *      200:
 *        description: Retorna todas as despesas da carteira
 *      404:
 *        description: Retorna um array vazio
 *      500: 
 *        description: Erro interno
 */
routeDespesa.patch("/atualizar", isAuthenticated, requestBodyValido, requiredDespesa, async (req, res, next) => {
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
routeDespesa.delete("/excluir", isAuthenticated, requestBodyValido, requiredUuid, async (req, res, next) => {
  try {
    await controllerDespesa.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})