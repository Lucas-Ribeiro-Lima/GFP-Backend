import e from 'express'
import session from 'express-session'
import { redisStore } from './configs/redis.ts'
import { envs } from './configs/env.ts'
import { errorHandlerHttp } from './lib/middlewares/errorHandlerHttp.ts'
import { logHandler } from './lib/middlewares/logHandler.ts'
import { def } from './routes/default.ts'
import { routeCarteira } from './routes/routeCarteira.ts'
import { routeConta } from './routes/routeConta.ts'
import { routeDespesa } from './routes/routeDespesa.ts'
import { routeRenda } from './routes/routeRenda.ts'
import { routeSwagger } from './routes/routeSwagger.ts'
import { routeAuth } from './routes/routeAuth.ts'

export const app = e()
app.disable('x-powered-by')

//Configurações do Express
app.use(e.json())
app.use(e.urlencoded({extended: true}))
app.use(session({
  store: redisStore,
  secret: envs.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false
  }
}))

//Rota padrão
app.get("/", def)

//Documentação
app.use("/api-docs", routeSwagger)
//Autencação
app.use("/auth", routeAuth)
//Conta
app.use("/conta", routeConta)
//Carteira
app.use("/carteira", routeCarteira)
//Registros
app.use("/despesa", routeDespesa)
app.use("/renda", routeRenda)


app.use(logHandler)
app.use(errorHandlerHttp)

