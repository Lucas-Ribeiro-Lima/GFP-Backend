import { EntitieInstanceError } from "../errors/customErrors.ts"

export interface CarteiraProps {
  id: number, 
  idContaDono: number,
  nome: string,
  saldo: number,
  meta: number,
  compartilhada: boolean
  idGrupoEconomico: number | null
}
export class Carteira { 
  private readonly props: CarteiraProps

  constructor({id, idContaDono, nome, saldo, meta, compartilhada, idGrupoEconomico}: CarteiraProps) {
    if(idContaDono === null || undefined) throw new Error("Id Conta inválido") 
    this.props = { id, idContaDono, nome, saldo, meta, compartilhada, idGrupoEconomico }
  }

  get allProps() {
    return this.props
  }

  get id() {
    return this.props.id
  }

  get idContaDono() {
    return this.props.idContaDono
  }

  get nome() {
    return this.props.nome
  }

  get saldo() {
    return this.props.saldo
  }

  get meta() {
    return this.props.meta
  }

  get compartilhada() {
    return this.props.compartilhada
  }

  get idGrupoEconomico(): number | null  {
    return this.props.idGrupoEconomico
  }
  
  set nome(nome: string) {
    if (nome.length < 5) throw new EntitieInstanceError("Nome inválido. Mínimo de 5 caractéres")
    this.props.nome = nome
  } 

  set saldo(valor: number) {
    this.props.saldo = valor
  }

  set meta(valor: number) {
    if(valor < 0) throw new EntitieInstanceError("Meta inválida. Por favor insira um valor positivo válido")
    this.props.meta = valor
  }

  set compartilhada(status: boolean) {
    this.props.compartilhada = status
  }

  set idGrupoEconomico(id: number) {
    this.props.idGrupoEconomico = id
  }
}