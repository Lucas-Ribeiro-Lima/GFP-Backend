import e from 'express'
import { errorHandlerHttp } from '../lib/middlewares/errorHandlerHttp.ts'
import { logHandler } from '../lib/middlewares/logHandler.ts'
import { def } from '../routes/default.ts'
import { routeSwagger } from '../routes/routeSwagger.ts'
import { routeConta } from '../routes/routeConta.ts'

export const app = e()

app.use(e.json())

app.get("/", def)

app.use("/api-docs", routeSwagger)
app.use("/conta", routeConta)

app.use(logHandler)
app.use(errorHandlerHttp)

