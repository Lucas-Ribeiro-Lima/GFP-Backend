type ConfigsType = {
  tema: "Dark" | "Light",
  displayName: string,
  customWpp: string
}

interface ContaProps {
  id: number
  email: string,
  provider: string,
  nome: string,
  cpf: string,
  configs: ConfigsType | null
}

export class Conta {
  private props: ContaProps
    constructor({id, email, provider, nome, cpf}: ContaProps) {
    this.props = {id, email, provider, nome, cpf, configs: null}
  }
  
  public get id() {
    return this.props.id
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