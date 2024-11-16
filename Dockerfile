# Usar uma imagem base leve
FROM node:23-alpine3.20

# Criar usuário e grupo
RUN addgroup -S gfp \
    && adduser -S gfp -G gfp

# Configurar diretório de trabalho e permissões
WORKDIR /gfp
RUN mkdir /gfp/prisma \
    && chown -R gfp:gfp /gfp

# Copiar arquivos antes de alterar o usuário para melhorar cacheabilidade
COPY package.json . 
COPY prisma ./prisma

# Instalar dependências de produção
RUN yarn install --omit=dev && yarn cache clean --force

# Copiar o restante do código
COPY ./dist ./dist

# Alterar para o usuário não-root
USER gfp

# Expor a porta da aplicação
EXPOSE 5000

# Comando para iniciar o container
CMD [ "npm", "start" ]
