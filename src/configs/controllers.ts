import { env }  from 'process'
//Development

//Repositorios InMemory
import { InMemoryCarteira } from '../adapters/repo/in-memory/inMemoryCarteira.ts'
import { InMemoryContas } from '../adapters/repo/in-memory/inMemoryContas.ts'
import { InMemoryRendas, InMemoryDespesas} from '../adapters/repo/in-memory/inMemoryRegistros.ts'
import { InMemoryFederado } from '../adapters/repo/in-memory/inMemoryFederado.ts'

//Repositorios Prisma
import { PrismaCarteira } from '../adapters/repo/prisma/prismaCarteira.ts'
import { PrismaConta } from '../adapters/repo/prisma/prismaConta.ts'
import { PrismaRenda } from '../adapters/repo/prisma/prismaRenda.ts'
import { PrismaDespesa } from '../adapters/repo/prisma/prismaDespesa.ts'
import { PrismaFederado } from '../adapters/repo/prisma/prismaFederado.ts'


//Use Cases
import { GerenciarCarteira } from '../useCases/gerenciarCarteira.ts'
import { GerenciarConta } from '../useCases/gerenciarConta.ts'
import { GerenciarDespesa } from '../useCases/gerenciarDespesa.ts'
import { GerenciarRenda } from '../useCases/gerenciarRenda.ts'
import { GerenciarFederado } from '../useCases/gerenciarFederado.ts'
import { GerenciarLogin } from '../useCases/gerenciarLogin.ts'

//Controlers
import { ControllerCarteira} from "../adapters/controllers/http/controllerCarteira.ts"
import { ControllerConta } from "../adapters/controllers/http/controllerConta.ts"
import { ControllerDespesa } from "../adapters/controllers/http/controllerDespesa.ts"
import { ControllerRenda } from "../adapters/controllers/http/controllerRenda.ts"
import { ControllerLogin } from '../adapters/controllers/controllerLogin.ts'

const repoCarteira = (env.NODE_ENV !== 'production') ? new InMemoryCarteira() : new PrismaCarteira()
const repoConta = (env.NODE_ENV !== 'production') ? new InMemoryContas(): new PrismaConta()
const repoRendas = (env.NODE_ENV !== 'production') ? new InMemoryRendas(): new PrismaRenda()
const repoDespesa = (env.NODE_ENV !== 'production') ? new InMemoryDespesas(): new PrismaDespesa()
const repoFederado = (env.NODE_ENV !== 'production') ? new InMemoryFederado(): new PrismaFederado()

const gerenciarCarteira = new GerenciarCarteira(repoCarteira)
const gerenciarConta = new GerenciarConta(repoConta)
const gerenciarDespesa = new GerenciarDespesa(repoDespesa)
const gerenciarRenda = new GerenciarRenda(repoRendas)
const gerenciarFederado = new GerenciarFederado(repoFederado)
const gerenciarLogin = new GerenciarLogin(gerenciarFederado, gerenciarConta)

export const controllerCarteira = new ControllerCarteira(gerenciarCarteira)
export const controllerConta = new ControllerConta(gerenciarConta)
export const controllerDespesa = new ControllerDespesa(gerenciarDespesa)
export const controllerRenda = new ControllerRenda(gerenciarRenda)
export const controllerLogin = new ControllerLogin(gerenciarLogin)

 
