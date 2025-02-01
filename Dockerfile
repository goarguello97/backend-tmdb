FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

## RUN npm install -g typescript

RUN mkdir -p dist

RUN npm run build

RUN npm run copy

EXPOSE 3000

CMD ["node", "dist/server.js"]