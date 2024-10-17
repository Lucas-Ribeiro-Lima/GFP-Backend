import { GerenciarDespesaI } from '@/useCases/gerenciarDespesa.ts'
import { Request, Response } from 'express'
import { ControllerHttpI } from './controllerHttpI.ts'
import { InvalidInputError } from '../../errors/customErrors.ts'

export class ControllerDespesa implements ControllerHttpI {
  constructor(private gerenciarDespesa: GerenciarDespesaI) {}

  async handleHttpGet(req: Request, res: Response): Promise<Response> {
    const idCarteira = Number(req.params.idCarteira)
    if(isNaN(idCarteira)) throw new InvalidInputError("Id da carteira inválido")
    const despesas = await this.gerenciarDespesa.buscar(idCarteira)
    return res.status(200).json(despesas)
  }

  async handleHttpPost(req: Request, res: Response): Promise<Response> {
    const despesa = req.body.despesa

    await this.gerenciarDespesa.cadastrar(despesa)
    return res.status(201).json({message: "Despesa criada com sucesso"})
  }

  async handleHttpPatch(req: Request, res: Response): Promise<Response> {
    const despesa = req.body.despesa

    await this.gerenciarDespesa.atualizar(despesa)
    return res.status(200).json({message: "Despesa atualizada com sucesso"})
  }

  async handleHttpDelete(req: Request, res: Response): Promise<Response> {
    const uuid = req.params.uuid
    await this.gerenciarDespesa.excluir(uuid)
    return res.status(204).json({message: "Despesa excluida com sucesso"})

  }
}