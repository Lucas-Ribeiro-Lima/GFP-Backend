interface ConfigsProps {
  tema: "Dark" | "Light",
  displayName: string,
  customWpp: string
}

export class Configs {  
  private props: ConfigsProps = {
    tema: "Light",
    displayName: '',
    customWpp: ''
  }

  constructor() {}

  get tema() {
    return this.props.tema
  }
  set tema(valor: "Dark" | "Light") {
    this.props.tema = valor
  }

  get displayName() {
    return this.props.displayName
  }
  set displayName(nome: string) {
    this.props.displayName = nome
  }

  get customWpp() {
    return this.props.customWpp
  }
  set customWpp(url: string) {
    this.props.customWpp = url
  }
}

