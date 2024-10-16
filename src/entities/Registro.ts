import { randomUUID } from "crypto"

type Competencia = {
  mes: number,
  ano: number,
  dataInclusao: string
}

type enumReg = 'fixo' | 'variavel'

export interface RegistroProps {
  uuid: string
  idCarteira: number
  descricao: string
  valor: number
  competencia: Competencia
  modalidade: enumReg,
  categoria: string
}


export abstract class Registro {
  protected props: RegistroProps
  
  constructor({descricao, idCarteira, valor, competencia, modalidade, categoria}: RegistroProps) {
    const newUuid = randomUUID()
    this.props = {uuid: newUuid, idCarteira, descricao, valor, competencia, modalidade, categoria}
  }

  public get uuid() {
    return this.props.uuid
  }

  public get idCarteira() {
    return this.props.idCarteira
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

  public get modalidade() {
    return this.props.modalidade
  }
  public set modalidade(modalidade: enumReg) {
    this.props.modalidade = modalidade
  }
}

