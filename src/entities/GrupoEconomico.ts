import { EntitieInstanceError } from "../errors/customErrors.ts"

export interface GrupoEconomicoProps {
  id: number,
  nome: string,
  descricao: string,
  metaGeral: number,
}

export class GrupoEconomico {
  private readonly props: GrupoEconomicoProps

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
    if(nome.length < 5) throw new EntitieInstanceError("Nome inválido. O nome deve conter pelo menos 5 caracteres")
    this.props.nome = nome
  }

  get descricao() {
    return this.props.descricao
  }

  get metaGeral() {
    return this.props.metaGeral
  }
  set metaGeral(meta: number) {
    if(meta <= 0) throw new EntitieInstanceError("Valor inválido. A meta não pode ser negativa")
    this.props.metaGeral = meta
  }
}
