import { Request, Response } from 'express'
import { GerenciarDespesaProps } from '../../../useCases/gerenciarDespesa.ts'
import { ControllerHttpProps } from './controllerHttpProps.ts'
import { randomUUID } from 'crypto'

export class ControllerDespesa implements ControllerHttpProps {
  constructor(private gerenciarDespesa: GerenciarDespesaProps) {}

  async handleHttpGet(req: Request, res: Response): Promise<Response> {
    const despesas = await this.gerenciarDespesa.buscar(req.body.idCarteira)
    return res.status(200).json(despesas)
  }

  async handleHttpPost(req: Request, res: Response): Promise<Response> {
    req.body.despesa.uuid = randomUUID()
    await this.gerenciarDespesa.cadastrar(req.body.despesa)
    return res.status(201).json({message: "Despesa criada com sucesso"})
  }

  async handleHttpPatch(req: Request, res: Response): Promise<Response> {
    await this.gerenciarDespesa.atualizar(req.body.despesa)
    return res.status(200).json({message: "Despesa atualizada com sucesso"})
  }

  async handleHttpDelete(req: Request, res: Response): Promise<Response> {
    await this.gerenciarDespesa.excluir(req.body.uuid)
    return res.status(204).json({message: "Despesa excluida com sucesso"})
  }
}