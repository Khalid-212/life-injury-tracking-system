FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@7

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build

COPY .next ./.next

CMD [ "npm", "run", "dev" ]
