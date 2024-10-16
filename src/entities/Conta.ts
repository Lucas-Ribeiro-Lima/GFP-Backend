import { EntitieInstanceError } from "../errors/customErrors.ts"
import { cpfValido, emailValido } from "../lib/utils.ts"
import { Configs } from "./Config.ts"

interface ContaProps {
  id: number | null,
  email: string,
  provider: string,
  nome: string,
  cpf: string,
  configs: Configs
}

export class Conta {
  private props: ContaProps
    constructor(props: ContaProps) {
    if(!emailValido(props.email)) throw new Error("Email inválido")
    if(!cpfValido(props.cpf)) throw new Error("CPF inválido")
    this.props = props
  }
  
  public get id() {
    return this.props.id
  }
  public set id(id: number | null){
    this.props.id = id
  }

  public get email() {
    return this.props.email
  }
  public set email(email: string) {
    if(!emailValido(email)) throw new EntitieInstanceError("Email inválido")
    this.props.email = email
  }

  public get provider() {
    return this.props.provider
  }

  public get nome() {
    return this.props.nome
  }

  public get cpf() {
    return this.props.cpf
  }
  public set cpf(cpf: string) {
    if(!cpfValido(cpf)) throw new EntitieInstanceError("CPF Inválido")
    this.props.cpf = cpf
  }

  public get configs() {
    return this.props.configs
  }
  public set configs(configs: Configs) {
    this.props.configs = configs
  }
}