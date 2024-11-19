FROM node:23-alpine3.20 AS production

WORKDIR /gfp

ENV NODE_ENV=production

COPY package.json .
COPY node_modules ./node_modules
COPY dist ./dist
COPY prisma ./prisma

EXPOSE 5000

CMD ["npm", "start"]
