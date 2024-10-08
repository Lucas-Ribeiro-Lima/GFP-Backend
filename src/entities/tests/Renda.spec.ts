import { randomUUID } from "crypto";
import { describe, expect, it } from 'vitest';
import { Renda } from "../Renda.ts";

describe("Testes da classe renda", () => {
  const rendaValid = new Renda({
    uuid: randomUUID(),
    id_carteira: 1,
    categoria: "salario", 
    competencia: { ano: 2024, mes: 10, dataInclusao:  Date.now().toString() }, 
    descricao: "teste",
    fonte: "renda",
    frequencia: "trimestral",
    tipo: "fixo",
    valor: 200}
  )
  
  it("deve criar uma classe especializada do tipo renda corretamente", () => {
    expect(rendaValid).instanceOf(Renda)
  })

})