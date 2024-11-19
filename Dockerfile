# Usar uma imagem base leve
FROM node:23-alpine3.20 AS builder

# Criar usuário e grupo
RUN addgroup -S gfp \
    && adduser -S gfp -G gfp

# Configurar diretório de trabalho
WORKDIR /gfp

# Copiar arquivos necessários para instalar dependências
COPY package.json ./
COPY prisma ./prisma
COPY src ./src

# Instalar dependências e construir o projeto
RUN npm install && npm run build

# Final Stage
FROM node:23-alpine3.20 AS production

# Criar o mesmo usuário no estágio de produção
RUN addgroup -S gfp \
    && adduser -S gfp -G gfp

# Configurar diretório de trabalho
WORKDIR /gfp

# Copiar arquivos do estágio `builder`
COPY --from=builder /gfp/package.json .
COPY --from=builder /gfp/node_modules ./node_modules
COPY --from=builder /gfp/dist ./dist
COPY --from=builder /gfp/prisma ./prisma

# Alterar para o usuário não-root
USER gfp

# Expor a porta da aplicação
EXPOSE 5000

# Definir o comando de execução
CMD ["node", "dist/main.js"]