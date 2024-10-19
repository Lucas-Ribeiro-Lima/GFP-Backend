import e from 'express'
import { errorHandlerHttp } from '../lib/middlewares/errorHandlerHttp.ts'
import { logHandler } from '../lib/middlewares/logHandler.ts'
import { def } from '../routes/default.ts'
import { routeSwagger } from '../routes/routeSwagger.ts'
import { routeConta } from '../routes/routeConta.ts'
import { routeCarteira } from '../routes/routeCarteira.ts'
import { routeDespesa } from '../routes/routeDespesa.ts'
import { routeRenda } from '../routes/routeRenda.ts'

export const app = e()
app.disable('x-powered-by')

app.use(e.json())

app.get("/", def)

//Documentação
app.use("/api-docs", routeSwagger)
//Conta
app.use("/conta", routeConta)
//Carteira
app.use("/carteira", routeCarteira)
//Registros
app.use("/despesa", routeDespesa)
app.use("/renda", routeRenda)


app.use(logHandler)
app.use(errorHandlerHttp)

