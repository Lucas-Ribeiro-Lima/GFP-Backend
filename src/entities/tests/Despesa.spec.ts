import { randomUUID } from "crypto";
import { describe, expect, it } from 'vitest';
import { Despesa } from "../Despesa.ts";

describe("Testes da classe Despesa", () => {
  const DespesaValid = new Despesa({
    uuid: randomUUID(),
    id_carteira: 1,
    parcelado: false,
    numParcelas: 1,
    categoria: "alimentacao",
    competencia: { ano: 2024, mes: 10, dataInclusao:  Date.now().toString() }, 
    descricao: "teste",
    tipo: "fixo",
    valor: 200}
  )
  
  it("deve criar uma classe especializada do tipo Despesa corretamente", () => {
    expect(DespesaValid).instanceOf(Despesa)
  })

})