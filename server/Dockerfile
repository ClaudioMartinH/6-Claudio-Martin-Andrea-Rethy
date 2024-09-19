FROM node:20

WORKDIR /usr/src/app

ENV DATABASE_URL="file:./dev.db" 

ENV JWT_SECRET=2c146a3da80f85866a3083e51e631c207fb45456ad86569992f1445a4043f788

COPY package*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]