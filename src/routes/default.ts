import { Router } from "express";

export const def = Router()

def.get("/", (req, res) => {
  res.json({
    message: "Hello GFP!",
  })
})

def.get("/__healthy", (req, res) => {
  res.status(200).send("ok")
})
