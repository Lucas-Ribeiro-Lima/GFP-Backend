import { Request, Response } from 'express'
import { GerenciarRendaProps } from '../../../useCases/gerenciarRenda.ts'
import { ControllerHttpProps } from './controllerHttpProps.ts'

export class ControllerRenda implements ControllerHttpProps {
  constructor(private gerenciarRenda: GerenciarRendaProps) {}

  public async handleHttpGet(req: Request, res: Response): Promise<Response> {
    const rendas = await this.gerenciarRenda.buscar(req.body.idCarteira)
    return res.status(200).json(rendas)
  }

  public async handleHttpPost (req: Request, res: Response): Promise<Response> {
    await this.gerenciarRenda.cadastrar(req.body.renda)
    return res.status(201).json({message: "Renda cadastrada com sucesso"})
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<Response> {
    await this.gerenciarRenda.atualizar(req.body.renda)
    return res.status(200).json({message: "Renda atualizada com sucesso"})
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<Response> {
    await this.gerenciarRenda.excluir(req.body.uuid)
    return res.status(204).json({message: "Renda excluida com sucesso"})
  }
}