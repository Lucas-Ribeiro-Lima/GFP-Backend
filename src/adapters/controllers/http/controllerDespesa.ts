import { randomUUID } from 'crypto'
import { Request, Response } from 'express'
import { GerenciarDespesaProps } from '../../../useCases/gerenciarDespesa.ts'
import { ControllerHttpProps } from './controllerHttpProps.ts'
import { InvalidInputError } from '../../../errors/customErrors.ts'

export class ControllerDespesa implements ControllerHttpProps {
  constructor(private gerenciarDespesa: GerenciarDespesaProps) {}

  async handleHttpGet(req: Request, res: Response): Promise<Response> {
    const idCarteira = Number(req.user?.idCarteira)
    if(isNaN(idCarteira)) throw new InvalidInputError("Id de conta do dono inválido")
  
    const despesas = await this.gerenciarDespesa.buscar(idCarteira)
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