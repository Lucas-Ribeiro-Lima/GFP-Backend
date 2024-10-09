import { Registro, RegistroProps } from "./Registro.ts";

type enumFrequencia = 'mensal' | 'trimestral' | 'semestral' | 'anual'

type enumCategoria = 'salario' | 'investimento' | 'bonus' | 'outros'

interface RendaProps extends RegistroProps {
  fonte: string,
  frequencia: enumFrequencia,
  categoria: enumCategoria
}

export class Renda extends Registro {
  protected props: RendaProps
  constructor(props: RendaProps) {
    super(props)
    this.props = props
  }

  public get uuid() {
    return this.props.uuid
  }
  public set uuid(uuid: string) {
    this.props.uuid = uuid
  }

  public get fonte() {
    return this.props.fonte
  }
  public set fonte(font: string) {
    this.props.fonte = font
  }

  public get frequencia() {
    return this.props.frequencia
  }
  public set frequencia(freq: enumFrequencia) {
    this.props.frequencia = freq
  }

  public get categoria() {
    return this.props.categoria
  }
  public set categoria(catg: enumCategoria) {
    this.props.categoria = catg
  }
}
