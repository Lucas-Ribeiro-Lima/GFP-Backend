import path from 'path'
import { env } from 'process'
import { createLogger, transports, format } from 'winston'

/**
 * 
 * @param cpf Cpf em formato de string com 11 caracteres.
 * @returns Booleano indicando se o CPF é valido.
 */
export function cpfValido (cpf: string) {
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

/**
 * 
 * @param email Email
 * @returns Retorna se o e-mail é valido. Contendo uma seção anterior ao \@ e
 * uma seção posterior seguida de um dominio.
 */
export function emailValido (email: string) {
  if((/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g).test(email)) return true
  else return false
}

const logFilesPath = path.join(process.cwd(), "src", "logs")
const { cli, timestamp, combine, label, printf } = format

const customFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}:${message}`;
});

export const logger = createLogger({
   level: "info",
   format: combine(
    label({ label: "GFP"}),
    timestamp({ format: "YYYY-MM-dd HH:mm"}),
    customFormat
  ),
   transports: [
     new transports.File({ dirname: logFilesPath, filename: "info.log", level: "info"}),
     new transports.File({ dirname: logFilesPath, filename: "error.log", level: "error"}),
     new transports.Console({format: combine(cli(), customFormat)})
   ]
})

if(env.NODE_ENV === "production") {
  logger.remove(transports.Console)
}