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

  public get provider() {
    return this.props.provider
  }

  public get nome() {
    return this.props.nome
  }

  public get cpf() {
    return this.props.cpf
  }

  public get configs() {
    return this.props.configs
  }
}