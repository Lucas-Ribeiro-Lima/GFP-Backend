import { Router } from "express";
import { passport } from '../adapters/passport/passport.ts'

export const routeAuth = Router()

routeAuth.get("/", (req, res) => {
  res.status(200).json({
    message: "Rotas de autenticação"
  })
})



routeAuth.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}))

routeAuth.get("/google/callback", passport.authenticate("google", {failureRedirect: "/login" }),
  (req, res) => {
    res.status(200).redirect("/")
  }
)