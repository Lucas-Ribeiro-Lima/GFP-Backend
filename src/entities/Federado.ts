export interface FederadoProps {
  idConta: number,
  provider: string,
  subject: string
}

export class Federado {
  private props: FederadoProps

  constructor(props: FederadoProps) {
    this.props = props
  }

  get allProps() {
    return this.props
  }

  get idConta() {
    return this.props.idConta
  }
  set idConta(idConta: number) {
    this.props.idConta = idConta
  }

  get provider() {
    return this.props.provider
  }
  set provider(provider: string) {
    this.props.provider = provider
  }

  get subject() {
    return this.props.subject
  }
  set subjet(subject: string) {
    this.props.subject = subject
  }
}