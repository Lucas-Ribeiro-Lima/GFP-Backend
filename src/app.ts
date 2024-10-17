import e from 'express'
import { envs } from './configs/env.ts'
import { def } from './routes/default.ts'
import { errorHandlerHttp } from './lib/middlewares/errorHandlerHttp.ts'
import { logHandler } from './lib/middlewares/logHandler.ts'

const app = e()
const host = envs.EXPRESS_HOST
const port = envs.EXPRESS_PORT

//Rota default
app.get("/", def)

app.use(logHandler)
app.use(errorHandlerHttp)

app.listen(port, () => {
  console.log(`Hello, GFP application listening http://${host}:${port}/`)
})

