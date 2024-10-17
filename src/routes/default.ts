import { Router } from "express";

export const def = Router()

def.get("/", (req, res) => {
  res.json({
    message: "Hello GFP!",
  })
})

