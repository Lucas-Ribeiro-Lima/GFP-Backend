import { describe, expect, it } from 'vitest'
import { GerenciarFederado } from '../gerenciarFederado.ts'
import { InMemoryFederado } from '../../adapters/repo/in-memory/inMemoryFederado.ts'
import { FederadoProps } from '@/entities/Federado.ts'


describe("Testes para o caso de uso de gerenciamento de contas federadas pelo provedor", () => {
  const repositorio = new InMemoryFederado()
  const gerenciarFederado = new GerenciarFederado(repositorio)


  it("deve criar uma conta federada corretamente", async () => {
    const contaFederada: FederadoProps = {
      idConta: 1,
      provider: "google",
      subject: "12345"
    }

    await gerenciarFederado.criar(contaFederada)

    const response = await gerenciarFederado.buscar("google", "12345")

    if(!response) expect.fail("Conta federada não encontrada")
    expect(response.idConta).toBe(1)
  })
})