import { GerenciarContaI } from '@/useCases/gerenciarConta.ts'
import { Request, Response } from 'express'

export class controllerConta {
  constructor(private gerenciarConta: GerenciarContaI) {}

  public async handleHttpPost (req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarConta.cadastrar()
      res.status(201).json({message: "Conta criada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({error: error.message})
    }
  }

  public async handleHttpGet(req: Request, res: Response): Promise<void> {
    try {
      const carteira = await this.gerenciarConta.buscar(req.body)
      res.status(200).json(carteira)
    } catch (error) {
      if(error instanceof Error) {
        if(error.message === "Conta não encontrada.") res.status(404)
        else res.status(500)
        res.json({error: error.message})
      }
    }
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarConta.atualizar(req.body)
      res.status(200).json("Conta atualizada com sucesso!")
    } catch (error) {
      if(error instanceof Error) {
        if(error.message === "Conta não encontrada") res.status(404)
        else res.status(500)
        res.json({error: error.message})
      }
    }
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarConta.excluir(req.body)
      res.status(204).json({message: "Conta deletada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({message: "Erro ao deletar conta."})
    }
  }
}