import { EntitieInstanceError } from "../errors/customErrors.ts"
import { ConfigsProps } from "./Config.ts"

export interface ContaProps {
  id?: number,
  email: string,
  nome: string,
  cpf?: string,
  photo?: string,
  configs: ConfigsProps
}

export class Conta {
  private props: ContaProps
    constructor(props: ContaProps) {
    if(!this.emailValido(props.email)) throw new EntitieInstanceError("Email inválido")
    this.props = props
  }

  public get allProps() {
    return this.props
  }
  
  public get id() {
    return this.props.id ?? 0
  }
  public set id(id: number){
    this.props.id = id
  }

  public get email() {
    return this.props.email
  }
  public set email(email: string) {
    if(!this.emailValido(email)) throw new EntitieInstanceError("Email inválido")
    this.props.email = email
  }

  public get nome() {
    return this.props.nome
  }
  public set nome(nome: string) {
    this.props.nome = nome
  }

  public get photo() {
    return this.props.photo ?? ""
  }

  public set photo(photo: string) {
    this.props.photo = photo
  }

  public get cpf() {
    return this.props.cpf ?? ""
  }
  public set cpf(cpf: string) {
    if(!this.cpfValido(cpf)) throw new EntitieInstanceError("CPF Inválido")
    this.props.cpf = cpf.replace(/\D/g, "")
  }

  public get configs() {
    return this.props.configs
  }
  public set configs(configs: ConfigsProps) {
    this.props.configs = configs
  }

  cpfValido (cpf: string) {
    const cpfFormatted = cpf.replace(/\D/g, "")
  
    if(cpfFormatted.length !== 11) return false
    if(/^(\d)\1*$/.test(cpfFormatted)) return false
  
    let soma = 0
    for(let i = 0; i < 9; i++) {
      const digit = parseInt(cpfFormatted[i])
      soma += digit * (10 - i)
    }
  
    let resto = soma % 11
  
    const primeiroDigito = resto < 2 ? 0 : 11 - resto
  
    if(parseInt(cpfFormatted[9]) !== primeiroDigito) return false
  
    soma = 0
    for(let i = 0; i < 10; i++) {
      const digit = parseInt(cpfFormatted[i])
      soma += digit * (11 - i)
    }
  
    resto = soma % 11
  
    const segundoDigito = resto < 2 ? 0 : 11 - resto
  
    if(parseInt(cpfFormatted[10]) !== segundoDigito) return false
    else return true
  }

  emailValido (email: string) {
    if((/^[a-zA-Z0-9._%+-]{3,56}@[a-zA-Z0-9.-]{3,36}\.[a-zA-Z]{2,4}$/).test(email)) return true
    else return false
  }
}