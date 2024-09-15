FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm cache clean --force && npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]