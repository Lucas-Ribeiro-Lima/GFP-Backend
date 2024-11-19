# Usar uma imagem base leve
FROM node:23-alpine3.20 AS builder

# Criar usuário e grupo
RUN addgroup -S gfp \
    && adduser -S gfp -G gfp

# Configurar diretório de trabalho e permissões
RUN mkdir /gfp \ && chown -R gfp:gfp /gfp
RUN mkdir /gfp/prisma \ && chown -R gfp:gfp /gfp/prisma

WORKDIR /gfp

# Copiar arquivos antes de alterar o usuário para melhorar cacheabilidade
COPY package.json . 
COPY prisma ./prisma

ENV NODE_ENV=production
# Instalar dependências de produção
RUN yarn install && yarn build

# Copiar o restante do código
COPY  --from=builder package.json .
COPY  --from=builder ./dist ./dist
COPY  --from=builder ./prisma ./prisma

# Alterar para o usuário não-root
USER gfp

# Expor a porta da aplicação
EXPOSE 5000

# Comando para iniciar o container
CMD [ "yarn", "start" ]
