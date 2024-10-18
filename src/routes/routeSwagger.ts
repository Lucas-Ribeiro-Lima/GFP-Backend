import { Router } from "express";
import { serve, setup } from 'swagger-ui-express'
import swaggerJsDocs from 'swagger-jsdoc'

export const routeSwagger = Router()

const optionsJsDocs = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Gestor de Finanças Pessoais',
      version: '1.0.0',
    },
  },
  apis: ['./src/**/*.ts'], // files containing annotations as above
};

const openApiSpecification = swaggerJsDocs(optionsJsDocs)

const optionsUi = {
  explorer: true
}

routeSwagger.use('/', serve)
routeSwagger.get('/', setup(openApiSpecification, optionsUi))