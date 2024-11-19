FROM node:23-alpine3.20 AS production

# Configurar diretório de trabalho
WORKDIR /gfp

# Copiar arquivos do estágio `builder`
COPY package.json .
COPY node_modules ./node_modules
COPY dist ./dist
COPY prisma ./prisma

# Expor a porta da aplicação
EXPOSE 5000

# Definir o comando de execução
CMD ["npm", "start"]