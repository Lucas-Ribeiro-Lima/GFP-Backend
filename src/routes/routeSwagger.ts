import { Router, Response, Request, NextFunction } from "express";
import { serve, setup } from 'swagger-ui-express'
import swaggerJsDocs from 'swagger-jsdoc'
import { envs } from "../configs/env.ts";

export const routeSwagger = Router()

const optionsJsDocs = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Gestor de Finanças Pessoais',
      version: '1.0.0',
      description: "<strong>API para aplicação GFP<strong/>",
      servers: [
      {
       "url": "http://localhost:5000",
       "description": "Servidor de desenvolvimento"
      }
      ],
      tags: [
        {
          "name": "Contas",
          "description": "Serviços de gerenciamento de contas"
        },
        {
          "name": "Carteiras",
          "description": "Serviços de gerenciamento de carteiras"
        },
        {
          "name": "Rendas",
          "description": "Serviços de gerenciamento de rendas"
        },
        {
          "name": "Despesas",
          "description": "Serviços de gerenciamento de despesas"
        },
      ]
    },
  },
  components: {},
  apis: ['./src/**/*.ts'], // files containing annotations as above
};

const openApiSpecification = swaggerJsDocs(optionsJsDocs)

const optionsUi = {
  explorer: true
}

routeSwagger.use('/', serve)
routeSwagger.get('/', authorizateDocs, setup(openApiSpecification, optionsUi))


function authorizateDocs(req: Request, res: Response, next: NextFunction) {
  if(req.hostname !== envs.EXPRESS_HOST) {
    res.status(403).json({message: "Acesso proibido"})
    return
  }
  next()
}