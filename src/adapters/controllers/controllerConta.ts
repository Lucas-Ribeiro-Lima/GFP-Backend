import { GerenciarContaI } from '@/useCases/gerenciarConta.ts'
import { Request, Response } from 'express'
import { controllerHtppI } from './controllerHttpI.ts'
import { InvalidInputError } from '../../errors/customErrors.ts'
import { emailValido } from '../../lib/utils.ts'
import { Conta } from '@/entities/Conta.ts'

export class ControllerConta implements controllerHtppI {
  constructor(private gerenciarConta: GerenciarContaI) {}

  public async handleHttpGet(req: Request, res: Response): Promise<Response> {
    const email = req.body.email
    if(!emailValido(email)) throw new InvalidInputError("E-mail inválido")

    const conta = await this.gerenciarConta.buscar(email)
    return res.status(200).json(conta)
  }

  public async handleHttpPost (req: Request, res: Response): Promise<Response> {
    const {nome, email, provider, cpf}: Conta = req.body.conta

    await this.gerenciarConta.cadastrar(nome, email, cpf, provider)
    return res.status(201).json({message: "Conta criada com sucesso"})
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<Response> {
    const conta = req.body.conta

    await this.gerenciarConta.atualizar(conta)
    return res.status(200).json({message: "Conta atualizada com sucesso"})
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<Response> {
    const email = req.body.email
    if(!emailValido(email)) throw new InvalidInputError("Email inválido")

    await this.gerenciarConta.excluir(email)
    return res.status(204).json({message: "Conta excluída com sucesso"})
  }
}