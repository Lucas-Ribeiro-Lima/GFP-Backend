import { Registro, RegistroProps } from "./Registro.ts";

export type enumCategoria = 'alimentacao' | 'moradia' | 'lazer' | 'outros'

export interface DespesaProps extends RegistroProps {
  parcelado?: boolean,
  numParcelas?: number,
  categoria: enumCategoria
}

export class Despesa extends Registro {
  protected readonly props: DespesaProps
  constructor(props: DespesaProps) {
    super(props)
    this.props = props
  }
  public get allProps() {
    return this.props
  }

  public get parcelado() {
    return this.props.parcelado ?? false
  }
  public set parcelado(bool: boolean) {
    this.props.parcelado = bool
  }

  public get numParcelas() {
    return this.props.numParcelas ?? 1
  }
  public set numParcelas(num: number) {
    this.props.numParcelas = num
  }

  public get categoria() {
    return this.props.categoria
  }
  public set categoria(catg: enumCategoria) {
    this.props.categoria = catg
  }
}
