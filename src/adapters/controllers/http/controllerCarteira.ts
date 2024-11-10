import { Request, Response } from 'express'
import { InvalidInputError } from '../../../errors/customErrors.ts'
import { GerenciarCarteiraProps } from '../../../useCases/gerenciarCarteira.ts'
import { ControllerHttpProps } from './controllerHttpProps.ts'

export class ControllerCarteira implements ControllerHttpProps {
  constructor(private gerenciarCarteira: GerenciarCarteiraProps) {}

  public async handleHttpGet(req: Request, res: Response): Promise<Response> {
	const idContaDono = Number(req.user?.id)
	if(isNaN(idContaDono)) throw new InvalidInputError("Id de conta do dono inválido")

	const carteira = await this.gerenciarCarteira.buscar(idContaDono)

	req.session.passport!.user.idCarteira = carteira?.id

	return (carteira) ? res.status(200).json(carteira) : res.status(404).json(null)
  }

  public async handleHttpPost (req: Request, res: Response): Promise<Response> {
	await this.gerenciarCarteira.cadastrar(req.body.carteira)
	return res.status(201).json({message: "Carteira criada com sucesso"})      
  }

  public async handleHttpPatch(req: Request, res: Response): Promise<Response> {
	await this.gerenciarCarteira.atualizar(req.body.carteira)
	return res.status(200).json({message: "Carteira atualizada com sucesso"})
  }

  public async handleHttpDelete(req: Request, res: Response): Promise<Response> {
	const id = Number(req.user?.idCarteira)
	if(isNaN(id)) throw new InvalidInputError("Id inválido")

	await this.gerenciarCarteira.excluir(id)
	return res.status(204).json({message: "Carteira deletada com sucesso"})
  }
}