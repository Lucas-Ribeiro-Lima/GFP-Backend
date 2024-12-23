import { Router } from 'express'
import { contaCriarSchema, contaSchema } from '../adapters/zod/schemas/conta.ts'
import { controllerConta } from '../configs/controllers.ts'
import { isAuthenticated } from '../lib/middlewares/authentication.ts'
import { requestBodyValido, requiredBodyProps } from '../lib/middlewares/validacoesHttp.ts'

export const routeConta = Router()

const requiredPropConta = requiredBodyProps(contaSchema, "conta")
const requiredPropCriar = requiredBodyProps(contaCriarSchema, "conta")

routeConta.get("/", async (req, res) => {
  res.json({
    path: "Serviços relacionados a conta"
  })
})

/**
 * @openapi
 * /conta/buscar:
 *  get:
 *    tags:
 *      - Contas
 *    summary: Recupera uma conta
 *    description: Endpoint para recuperação de contas baseado no e-mail
 *    responses:
 *      200:
 *         description: Retorna a conta solicitada.
 *      404:
 *         description: Returna null se não exister uma conta com o e-mail.
 */
routeConta.get("/buscar", isAuthenticated, async (req, res, next) => {
  try {
    await controllerConta.handleHttpGet(req,res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /conta/criar:
 *  post:
 *    tags:
 *      - Contas
 *    summary: Criar uma conta
 *    security:
 *      - openIdConnect: []
 *    description: Cria uma conta com os dados enviados
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          example:
 *            conta:
 *               nome: johndoe
 *               email: johndoe@doe.uk
 *    responses:
 *      201:
 *        description: Conta criada com sucesso
 *      400:
 *        description: Json inválido
 *      500:
 *        description: Erro interno    
 */
routeConta.post("/criar", isAuthenticated, requestBodyValido, requiredPropCriar, async (req, res, next) => {
  try {
    await controllerConta.handleHttpPost(req, res)
  } catch (error) {
    next(error)
  } 
})

/**
 * @openapi
 * /conta/atualizar:
 *  patch:
 *    tags:
 *      - Contas
 *    security:
 *      - openIdConnect: []
 *    summary: Atualiza uma conta
 *    description: Atualiza uma conta baseada nos dados enviados
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          example:
 *            conta: 
 *              id: 1
 *              nome: Doe John
 *              email: johndoe@doe.uk
 *              cpf: "12345678909"
 *              configs:
 *                tema: Dark            
 *                displayName: Does
 *                customWpp: myCustomWpp
 *    responses:
 *      200: 
 *        description: Conta atualizada com sucesso
 *      500: 
 *        description: Erro ao atualizar uma conta
 */
routeConta.patch("/atualizar", isAuthenticated, requestBodyValido, requiredPropConta, async (req, res, next) => {
  try {
    await controllerConta.handleHttpPatch(req, res)
  } catch (error) {
    next(error)
  }
})

/**
 * @openapi
 * /conta/excluir:
 *  delete:
 *    tags:
 *      - Contas
 *    security:
 *      - openIdConnect: []
 *    summary: Deleta uma conta
 *    description: Deleta uma conta baseada nos email enviados
 *    responses:
 *      204: 
 *        description: Conta deletada com sucesso
 *      500: 
 *        description: Erro ao deletar uma conta
 */
routeConta.delete("/excluir", isAuthenticated, async (req, res, next) => {
  try {
    await controllerConta.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})