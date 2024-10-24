import { Passport } from 'passport'
import { Strategy } from 'passport-google-oauth20'
import { controllerLogin } from '../../configs/controllers.ts'
import { envs } from '../../configs/env.ts'
import { AuthenticationError } from '../../errors/customErrors.ts'

export const passport = new Passport()
const GoogleStrat = Strategy
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, CALLBACK_DOMAIN } = envs

passport.use(new GoogleStrat({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: `${CALLBACK_DOMAIN}/auth/google/callback`,
}, async (accesToken, refreshToken, profile, done) => {
    try {
      const conta = await controllerLogin.validate(profile)
      done(null, conta.allProps)
    } catch (error) {
      done(error, false)
    }
  }
))

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser(async (user, done) => {
  if(!user) throw new AuthenticationError("Erro de autenticação ao deserializar usuário")
  done(null, user)
})