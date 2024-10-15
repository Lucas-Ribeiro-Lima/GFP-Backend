import { GerenciarCarteiraI } from '@/useCases/gerenciarCarteira.ts'
import { Request, Response } from 'express'

export class controllerCarteira {
  constructor(private gerenciarCarteira: GerenciarCarteiraI) {}

  public async handleHttpPost (req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarCarteira.cadastrar(req.body)
      res.status(201).json({message: "Carteira criada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({error: error.message})
    }
  }

  public async handleHttpGet(req: Request, res: Response): Promise<void> {
    try {
      const carteira = await this.gerenciarCarteira.buscar(req.body)
      res.status(200).json(carteira)
    } catch (error) {
      if(error instanceof Error) {
        if(error.message === "Carteira não encontrada.") res.status(404)
        else res.status(500)
        res.json({error: error.message})
      }
    }
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarCarteira.atualizar(req.body)
      res.status(200).json("Carteira atualizada com sucesso!")
    } catch (error) {
      if(error instanceof Error) {
        if(error.message === "A carteira a atualizar não foi encontrada.") res.status(404)
        else res.status(500)
        res.json({error: error.message})
      }
    }
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarCarteira.excluir(req.body)
      res.status(204).json({message: "Carteira deletada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({message: "Erro ao deletar a carteira."})
    }
  }
}