import { Request, Response } from 'express'
import { ContaProps } from '../../../entities/Conta.ts'
import { InvalidInputError } from '../../../errors/customErrors.ts'
import { emailValido } from '../../../lib/utils.ts'
import { GerenciarContaProps } from '../../../useCases/gerenciarConta.ts'
import { ControllerHttpProps } from './controllerHttpProps.ts'

export class ControllerConta implements ControllerHttpProps {
  constructor(private readonly gerenciarConta: GerenciarContaProps) {}

  public async handleHttpGet(req: Request, res: Response): Promise<Response> {
    const email = String(req.user?.email)
    if(!emailValido(email)) throw new InvalidInputError("E-mail inválido")

    const conta = await this.gerenciarConta.buscarEmail(email)
    return (!conta) ? res.status(404).json(conta) : res.status(200).json(conta)
  }

  public async handleHttpPost (req: Request, res: Response): Promise<Response> {
    const { nome, email }: ContaProps = req.body.conta

    await this.gerenciarConta.cadastrar(nome, email)
    return res.status(201).json({message: "Conta criada com sucesso"})
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<Response> {
    const conta = req.body.conta

    await this.gerenciarConta.atualizar(conta)
    return res.status(200).json({message: "Conta atualizada com sucesso"})
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<Response> {
    const email = String(req.user?.email)
    if(!emailValido(email)) throw new InvalidInputError("Email inválido")

    await this.gerenciarConta.excluir(email)
    return res.status(204).json({message: "Conta excluída com sucesso"})
  }
}