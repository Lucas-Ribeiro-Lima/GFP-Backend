import { GerenciarRendaI } from '@/useCases/gerenciarRenda.ts'
import { Request, Response } from 'express'

export class ControllerRenda {
  constructor(private gerenciarRenda: GerenciarRendaI) {}

  public async handleHttpPost (req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarRenda.cadastrar(req.body)
      res.status(201).json({message: "Renda criada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({error: error.message})
    }
  }

  public async handleHttpGet(req: Request, res: Response): Promise<void> {
    try {
      const renda = await this.gerenciarRenda.buscar(req.body)
      if(!renda) res.status(404).json("Rendas da carteira informada não foram encontradas")
      res.status(200).json(renda)
    } catch (error) {
      if(error instanceof Error) res.status(500).json({error: error.message})
    }
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarRenda.atualizar(req.body)
      res.status(200).json("Renda atualizada com sucesso!")
    } catch (error) {
      if(error instanceof Error) res.status(500).json({message: "Erro ao atualizar a renda."})
    }
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarRenda.excluir(req.body)
      res.status(204).json({message: "Renda deletada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({message: "Erro ao deletar a renda."})
    }
  }
}