FROM node:18-alpine

WORKDIR /file-process

COPY package.json .

RUN yarn

COPY . .

EXPOSE 5173

CMD yarn dev --debug