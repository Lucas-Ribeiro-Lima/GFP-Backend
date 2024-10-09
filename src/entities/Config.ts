interface ConfigsProps {
  tema: "Dark" | "Light",
  displayName?: string | null,
  customWpp?: string | null
}

export class Configs {  
  private props: ConfigsProps = {
    tema: "Light",
    displayName: null,
    customWpp: null
  }

  constructor() {}

  get tema() {
    return this.props.tema
  }

  get displayName() {
    return this.props.displayName
  }

  get customWpp() {
    return this.props.customWpp
  }
}

