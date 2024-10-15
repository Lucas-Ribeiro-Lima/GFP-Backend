import { GerenciarDespesaI } from '@/useCases/gerenciarDespesa.ts'
import { Request, Response } from 'express'

export class controllerDespesa {
  constructor(private gerenciarDespesa: GerenciarDespesaI) {}

  public async handleHttpPost (req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarDespesa.cadastrar(req.body)
      res.status(201).json({message: "Despesa criada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({error: error.message})
    }
  }

  public async handleHttpGet(req: Request, res: Response): Promise<void> {
    try {
      const despesa = await this.gerenciarDespesa.buscar(req.body)
      if(!despesa) res.status(404).json("Despesas da carteira informada não foram encontradas")
      res.status(200).json(despesa)
    } catch (error) {
      if(error instanceof Error) res.status(500).json({error: error.message})
    }
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarDespesa.atualizar(req.body)
      res.status(200).json("Despesa atualizada com sucesso!")
    } catch (error) {
      if(error instanceof Error) res.status(500).json({message: "Erro ao atualizar a despesa"})
    }
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<void> {
    try {
      await this.gerenciarDespesa.excluir(req.body)
      res.status(204).json({message: "Despesa deletada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) res.status(500).json({message: "Erro ao deletar a despesa"})
    }
  }
}