FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN apk update && apk add postgresql-client && npm install

COPY . .

EXPOSE 5001

ENV NODE_ENV=development

CMD ["npm", "run", "start:dev"]
