import { app } from './configs/app.ts'
import { envs } from './configs/env.ts'

const host = envs.EXPRESS_HOST
const port = envs.EXPRESS_PORT

app.listen(port, () => {
  console.log(`\n\x1b[1m\x1b[92mHello, \x1b[33mGFP application\x1b[0m listening on:\x1b[3m\x1b[36m http://${host}:${port}/\x1b[0m\n`)
  console.log(`\x1b[1m\x1b[41m API-Docs \x1b[0mcan be found on \x1b[3m\x1b[95mhttp://${host}:${port}/api-docs\x1b[0m`)
})

