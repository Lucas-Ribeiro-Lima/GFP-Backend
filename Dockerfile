FROM node:23-alpine3.20

RUN addgroup -S gfp \
&& adduser -S gfp -G gfp

RUN mkdir /gfp \
&& chown -R gfp:gfp /gfp

USER gfp

WORKDIR /gfp

COPY prisma .
COPY package.json .
COPY ./dist ./dist

RUN npm install --omit=dev

EXPOSE 5000

CMD [ "npm", "start" ]