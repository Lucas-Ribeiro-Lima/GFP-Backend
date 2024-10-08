import { Registro, RegistroProps } from "./Registro.ts";

type enumCategoria = 'alimentacao' | 'moradia' | 'lazer' | 'outros'

interface DespesaProps extends RegistroProps {
  parcelado: boolean,
  numParcelas: number,
  categoria: enumCategoria
}

export class Despesa extends Registro {
  protected props: DespesaProps
  constructor(props: DespesaProps) {
    super(props)
    this.props = props
  }

  public get parcelado() {
    return this.props.parcelado
  }
  public set parcelado(bool: boolean) {
    this.props.parcelado = bool
  }

  public get numParcelas() {
    return this.props.numParcelas
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
