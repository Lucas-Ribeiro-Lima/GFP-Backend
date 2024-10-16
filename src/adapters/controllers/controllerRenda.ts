import { GerenciarRendaI } from '../../useCases/gerenciarRenda.ts'
import { Request, Response } from 'express'
import { controllerHtppI } from './controllerHttpI.ts'
import { InvalidInputError } from '../../errors/customErrors.ts'

export class ControllerRenda implements controllerHtppI {
  constructor(private gerenciarRenda: GerenciarRendaI) {}

  public async handleHttpGet(req: Request, res: Response): Promise<Response> {
    const idCarteira = Number(req.params.idCarteira)
    if(isNaN(idCarteira)) throw new InvalidInputError("Id da carteira inválido")

    const rendas = await this.gerenciarRenda.buscar(idCarteira)
    return res.status(200).json(rendas)
  }

  public async handleHttpPost (req: Request, res: Response): Promise<Response> {
    const renda = req.body.renda
    
    await this.gerenciarRenda.cadastrar(renda)
    return res.status(201).json({message: "Renda cadastrada com sucesso"})
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<Response> {
    const renda = req.body.renda

    await this.gerenciarRenda.atualizar(renda)
    return res.status(200).json({message: "Renda atualizada com sucesso"})
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<Response> {
    const uuid = req.params.uuid

    await this.gerenciarRenda.excluir(uuid)
    return res.status(204).json({message: "Renda excluida com sucesso"})
  }
}