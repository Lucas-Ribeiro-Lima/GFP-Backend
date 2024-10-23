import { AuthenticationError } from "../../errors/customErrors.ts";
import { Profile } from "passport-google-oauth20";
import { GerenciarLoginProps } from "../../useCases/gerenciarLogin.ts";
import { Conta } from "../../entities/Conta.ts";

export interface ControllerLoginProps {
  validate({ provider, id, emails, displayName }: Profile): Promise<Conta>
}


export class ControllerLogin implements ControllerLoginProps {
  constructor(private gerenciarLogin: GerenciarLoginProps) {}
  
  async validate({ provider, id: subject, emails, displayName}: Profile): Promise<Conta> {
    const email = emails?.[0].value
    if(!email) throw new AuthenticationError("Email enviado pelo provedor inválido")
    return await this.gerenciarLogin.loginFederado({ provider, subject, email, displayName })
  }
}