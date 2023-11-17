FROM node:12.18.3-alpine3.12

# Create app directory

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

COPY .next ./.next

CMD [ "npm", "run", "dev" ]
