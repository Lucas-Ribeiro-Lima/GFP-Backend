interface GrupoEconomicoProps {
  id: number,
  nome: string,
  descricao: string,
  metaGeral: number,
}

export class GrupoEconomico {
  private props: GrupoEconomicoProps

  constructor({id, nome, descricao, metaGeral}: GrupoEconomicoProps) {
    this.props = {id, nome, descricao, metaGeral}
  }

  get id() {
    return this.props.id
  }

  get nome() {
    return this.props.nome
  }
  set nome(nome: string) {
    if(nome.length < 5) throw new Error("Nome inválido. O nome deve conter pelo menos 5 caracteres")
    this.props.nome = nome
  }

  get descricao() {
    return this.props.descricao
  }

  get metaGeral() {
    return this.props.metaGeral
  }
  set metaGeral(meta: number) {
    if(meta <= 0) throw new Error("Valor inválido. A meta não pode ser negativa")
    this.props.metaGeral = meta
  }
}
