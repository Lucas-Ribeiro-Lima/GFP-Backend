
interface CarteiraProps {
  id: number, 
  id_conta_dono: number,
  nome: string,
  saldo: number,
  meta: number,
  compartilhada: boolean
  idGrupoEconomico: number | null
}
export class Carteira { 
  private readonly props: CarteiraProps

  constructor({id, id_conta_dono, nome, saldo, meta, compartilhada}: CarteiraProps) {
    if(id_conta_dono === null || undefined) throw new Error("Id Conta inválido")
    this.props = {id, id_conta_dono, nome, saldo, idGrupoEconomico: null, meta, compartilhada}
  }

  get allProps() {
    return this.props
  }
   
  set nome(nome: string) {
    if (nome.length < 5) throw new Error("Nome inválido, mínimo de 5 caractéres")
    this.props.nome = nome
  } 

  set saldo(valor: number) {
    this.props.saldo = valor
  }

  set meta(valor: number) {
    if(valor < 0) throw new Error("Meta inválida, por favor insira um valor positivo válido")
    this.props.meta = valor
  }

  set compartilhada(status: boolean) {
    this.props.compartilhada = status
  }
}