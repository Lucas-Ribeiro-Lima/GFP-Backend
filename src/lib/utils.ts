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

export function emailValido (email: string) {
  if((/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g).test(email)) return true
  else return false
}



