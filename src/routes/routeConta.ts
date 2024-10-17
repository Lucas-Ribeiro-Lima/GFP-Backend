import { Router } from 'express'
import { controllerConta } from '../configs/controllers.ts'
import { requestBodyValido } from '../lib/middlewares/validacoes.ts'

export const routeConta = Router()

routeConta.get("/", async (req, res) => {
  res.json({
    path: "Serviços relacionados a conta"
  })
})

routeConta.post("/buscar", requestBodyValido, async (req, res, next) => {
  try {
    await controllerConta.handleHttpGet(req,res)
  } catch (error) {
    next(error)
  }
})


