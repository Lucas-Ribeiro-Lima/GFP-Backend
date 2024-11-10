import { Profile } from "passport-google-oauth20";
import { ContaProps } from "../../entities/Conta.ts";
import { AuthenticationError } from "../../errors/customErrors.ts";
import { GerenciarLoginProps } from "../../useCases/gerenciarLogin.ts";

export interface ControllerLoginProps {
  validate({ provider, id, emails, displayName }: Profile): Promise<ContaProps>
}


export class ControllerLogin implements ControllerLoginProps {
  constructor(private gerenciarLogin: GerenciarLoginProps) {}
  
  async validate({ provider, id: subject, emails, displayName}: Profile): Promise<ContaProps> {
    const email = emails?.[0].value
    if(!email) throw new AuthenticationError("Email enviado pelo provedor inválido")
    return await this.gerenciarLogin.loginFederado({ provider, subject, email, displayName })
  }
}