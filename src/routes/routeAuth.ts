import { Router } from "express";
import { passport } from '../adapters/passport/passport.ts';
import { envs } from "../configs/env.ts";

export const routeAuth = Router()

routeAuth.get("/", (req, res) => {
  res.status(200).json({
    message: "Rotas de autenticação"
  })
})

routeAuth.get("/google", passport.authenticate("google", { scope: ["profile", "email"]}))

routeAuth.get("/google/callback", 
  passport.authenticate("google", {failureRedirect: "/auth/google" }),
  (req, res) => {
    res.status(200).redirect(envs.REDIRECT_FRONTEND_URL)
  }
)

routeAuth.post("/logout", (req, res, next) => {
  req.logOut((err) => {
    if(err) next(err)

      res.status(301).redirect(envs.REDIRECT_FRONTEND_URL)
  })
})