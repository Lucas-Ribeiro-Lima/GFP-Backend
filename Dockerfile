FROM node:23.2.0 AS production

WORKDIR /gfp

ENV NODE_ENV=production

COPY package.json .
COPY dist ./dist
COPY prisma ./prisma

RUN yarn install --production --ignore-scripts

EXPOSE 5000

CMD ["yarn", "start"]
