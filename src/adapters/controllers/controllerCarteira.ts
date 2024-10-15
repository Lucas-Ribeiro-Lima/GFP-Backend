import { GerenciarCarteiraI } from '@/useCases/gerenciarCarteira.ts'
import { Carteira } from '../../entities/Carteira.ts'
import { Request, Response } from 'express'

export class ControllerCarteira {
  constructor(private gerenciarCarteira: GerenciarCarteiraI) {}

  public async handleHttpGet(req: Request, res: Response): Promise<Response> {
    try {
      const idDono = Number(req.params.idDono)
      if(isNaN(idDono)) return res.status(400).json({error: "Id inválido"})

      const carteira = await this.gerenciarCarteira.buscar(idDono)
      if(!carteira) return res.status(404).json(carteira)
        
      return res.status(200).json(carteira)

    } catch (error) {
      if(error instanceof Error) {
        if(error.message === "Carteira não encontrada") res.status(404)
        else res.status(500)
        return res.json({error: error.message})
      }
      return res.status(500).json({error: "Erro crítico"})
    }
  }

  public async handleHttpPost (req: Request, res: Response): Promise<Response> {
    try {
      const carteira = new Carteira(req.body)
      if(!carteira.id) return res.status(400).json({message: "Carteira inválida"})

      await this.gerenciarCarteira.cadastrar(carteira)
      return res.status(201).json({message: "Carteira criada com sucesso!"})
      
    } catch (error) {
      if(error instanceof Error){ 
        return res.status(500).json({error: error.message})
      }
      return res.status(500).json({error: "Erro crítico"})
    }
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<Response> {
    try {
      const carteira = new Carteira(req.body)
      if(!carteira) return res.status(400).json({error: "Carteira inválida"})

      await this.gerenciarCarteira.atualizar(carteira)
      return res.status(200).json({message: "Carteira atualizada com sucesso!"})

    } catch (error) {
      if(error instanceof Error) {
        if(error.message === "A carteira a atualizar não foi encontrada.") res.status(404)
        else res.status(500)
        return res.json({error: error.message})
      }
      return res.status(500).json({error: "Erro crítico"})
    }
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id)
      if(isNaN(id)) return res.status(400).json({error: "Id inválido"})
      await this.gerenciarCarteira.excluir(id)
      return res.status(204).json({message: "Carteira deletada com sucesso!"})
    } catch (error) {
      if(error instanceof Error) {
        return res.status(500).json({message: "Erro ao deletar a carteira."})
      }
      return res.status(500).json({error: "Erro crítico"})
    }
  }
}