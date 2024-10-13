import { randomUUID } from "crypto"

type Competencia = {
  mes: number,
  ano: number,
  dataInclusao: string
}

type enumReg = 'fixo' | 'variavel'

export interface RegistroProps {
  uuid: string
  id_carteira: number
  descricao: string
  valor: number
  competencia: Competencia
  tipo: enumReg,
  categoria: string
}


export abstract class Registro {
  protected props: RegistroProps
  
  constructor({descricao, id_carteira, valor, competencia, tipo, categoria}: RegistroProps) {
    const newUuid = randomUUID()
    this.props = {uuid: newUuid, id_carteira, descricao, valor, competencia, tipo, categoria}
  }

  public get uuid() {
    return this.props.uuid
  }

  public get idCarteira() {
    return this.props.id_carteira
  }

  public get descricao() {
    return this.props.descricao
  }
  public set descricao(desc: string){
    this.props.descricao = desc
  }

  public get valor() {
    return this.props.valor
  }
  public set valor(val: number){
    this.props.valor = val
  }
  
  public get competencia() {
    return this.props.competencia
  }
  public set competenciaMes({mes, dataInclusao}: Competencia) {
    this.props.competencia.mes = mes
    this.props.competencia.dataInclusao = dataInclusao
  }
  public set competenciaAno({ ano }: Competencia) {
    this.props.competencia.ano = ano
  }
  public set competenciaDataInclusao({ dataInclusao }: Competencia){
    this.props.competencia.dataInclusao = dataInclusao
  }

  public get tipo() {
    return this.props.tipo
  }
  public set tipo(tipo: enumReg) {
    this.props.tipo = tipo
  }
}
