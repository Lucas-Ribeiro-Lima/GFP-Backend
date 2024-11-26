import { ContaProps } from '../entities/Conta.ts'
import { AuthenticationError } from '../errors/customErrors.ts'
import { GerenciarContaProps } from "./gerenciarConta.ts"
import { GerenciarFederadoProps } from "./gerenciarFederado.ts"

export interface GerenciarLoginProps {
  loginFederado(profile: ProfileProps): Promise<ContaProps>
}

export interface ProfileProps {
  provider: string
  subject: string
  email: string
  photo: string
  displayName: string
}

export class GerenciarLogin implements GerenciarLoginProps {

  constructor(private readonly gerenciarFederados: GerenciarFederadoProps, private readonly gerenciarConta: GerenciarContaProps) {}

  async loginFederado({ provider, subject, email, displayName, photo }: ProfileProps): Promise<ContaProps> {
    const federado = await this.gerenciarFederados.buscar(provider, subject)

    if (federado) {
      const conta = await this.gerenciarConta.buscar(federado.idConta)
      if (!conta) throw new AuthenticationError("Erro ao realizar login: Conta não encontrada.")
      return conta
    } 
    else {
      const idConta = await this.gerenciarConta.cadastrar(displayName ?? "Usuário", email, photo)
      await this.gerenciarFederados.criar({ idConta, provider, subject })

      const conta = await this.gerenciarConta.buscar(idConta)
      if (!conta) throw new AuthenticationError("Erro ao linkar a conta federada")    
      return conta
    }
  }
}
