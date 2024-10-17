import { GerenciarCarteiraI } from '@/useCases/gerenciarCarteira.ts'
import { Request, Response } from 'express'
import { Carteira } from '../../entities/Carteira.ts'
import { InvalidInputError } from '../../errors/customErrors.ts'
import { ControllerHttpI } from './controllerHttpI.ts'

export class ControllerCarteira implements ControllerHttpI {
  constructor(private gerenciarCarteira: GerenciarCarteiraI) {}

  public async handleHttpGet(req: Request, res: Response): Promise<Response> {
      const idContaDono = Number(req.params.idContaDono)
      if(isNaN(idContaDono)) throw new InvalidInputError("Id de conta do dono inválido")

      const carteira = await this.gerenciarCarteira.buscar(idContaDono)

      if(!carteira) return res.status(404).json(null)
      return res.status(200).json(carteira)
  }

  public async handleHttpPost (req: Request, res: Response): Promise<Response> {
      const carteira = new Carteira(req.body.carteira)
      await this.gerenciarCarteira.cadastrar(carteira)
      return res.status(201).json({message: "Carteira criada com sucesso"})      
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<Response> {
      const carteira = new Carteira(req.body.carteira)
      await this.gerenciarCarteira.atualizar(carteira)
      return res.status(200).json({message: "Carteira atualizada com sucesso"})
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<Response> {
      const id = Number(req.params.id)
      if(isNaN(id)) throw new InvalidInputError("Id inválido")

      await this.gerenciarCarteira.excluir(id)
      return res.status(204).json({message: "Carteira deletada com sucesso"})
  }
}