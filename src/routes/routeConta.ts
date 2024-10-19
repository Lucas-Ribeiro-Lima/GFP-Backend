import { Router } from 'express'
import { controllerConta } from '../configs/controllers.ts'
import { requestBodyValido, requiredtBodyProps } from '../lib/middlewares/validacoesHttp.ts'

export const routeConta = Router()

const requiredPropEmail = requiredtBodyProps(["email"])
const requiredPropConta = requiredtBodyProps([
  "id", "nome", "email", "cpf", "provider", "configs"
], "conta")
const requiredPropCriar = requiredtBodyProps(["nome", "email", "cpf", "provider"], "conta")

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
routeConta.post("/buscar", requestBodyValido, requiredPropEmail, async (req, res, next) => {
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
 *               cpf: 123456789-09
 *               provider: Google
 *    responses:
 *      201:
 *        description: Conta criada com sucesso
 *      400:
 *        description: Json inválido
 *      500:
 *        description: Erro interno    
 */
routeConta.post("/criar", requestBodyValido, requiredPropCriar, async (req, res, next) => {
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
 *            id: 0
 *            nome: Doe John
 *            email: johndoe@doe.uk
 *            cpf: 12345678909
 *            provider: Microsoft
 *            configs:
 *              tema: dark            
 *              displayName: Does
 *              customWpp: myCustomWpp
 *    responses:
 *      200: 
 *        description: Conta atualizada com sucesso
 *      500: 
 *        description: Erro ao atualizar uma conta
 */
routeConta.patch("/atualizar", requestBodyValido, requiredPropConta, async (req, res, next) => {
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
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          example:
 *            email: johndoe@doe.uk
 *    responses:
 *      204: 
 *        description: Conta deletada com sucesso
 *      500: 
 *        description: Erro ao deletar uma conta
 */
routeConta.delete("/excluir", requestBodyValido, requiredPropEmail, async (req, res, next) => {
  try {
    await controllerConta.handleHttpDelete(req, res)
  } catch (error) {
    next(error)
  }
})