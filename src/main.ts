import { envs } from './configs/env.ts'
import { app } from './configs/app.ts' 

const host = envs.EXPRESS_HOST
const port = envs.EXPRESS_PORT

app.listen(port, () => {
  console.log(`\x1b[1m\x1b[32mHello, \x1b[33mGFP application\x1b[0m listening on:\x1b[3m\x1b[36mhttp://${host}:${port}/\x1b[0m`);
})

