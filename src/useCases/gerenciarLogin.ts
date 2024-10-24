import { Conta } from '../entities/Conta.ts'
import { AuthenticationError } from '../errors/customErrors.ts'
import { GerenciarContaProps } from "./gerenciarConta.ts"
import { GerenciarFederadoProps } from "./gerenciarFederado.ts"

export interface GerenciarLoginProps {
  loginFederado(profile: ProfileProps): Promise<Conta>
}

export interface ProfileProps {
  provider: string
  subject: string
  email: string
  displayName: string
}

export class GerenciarLogin implements GerenciarLoginProps {

  constructor(private gerenciarFederados: GerenciarFederadoProps, private gerenciarConta: GerenciarContaProps) {}

  async loginFederado({ provider, subject, email, displayName }: ProfileProps): Promise<Conta> {
    const federado = await this.gerenciarFederados.buscar(provider, subject)

    if (federado) {
      const conta = await this.gerenciarConta.buscar(federado.idConta)
      if (!conta) throw new AuthenticationError("Erro ao realizar login: Conta não encontrada.")
      return conta
    } 
    else {
      const idConta = await this.gerenciarConta.cadastrar(displayName ?? "Usuário", email)
      await this.gerenciarFederados.criar({ idConta, provider, subject })

      const conta = await this.gerenciarConta.buscar(idConta)
      if (!conta) throw new AuthenticationError("Erro ao linkar a conta federada")    
      return conta
    }
  }
}
