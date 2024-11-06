FROM node:23-alpine3.20

RUN corepack enable

RUN mkdir /gfp

WORKDIR /gfp

COPY . .

RUN yarn install

EXPOSE 5000

CMD [ "yarn", "start" ]