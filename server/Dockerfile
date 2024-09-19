FROM node:20

WORKDIR /usr/src/app

ENV DATABASE_URL="file:./dev.db" 

ENV JWT_SECRET=2c146a3da80f85866a3083e51e631c207fb45456ad86569992f1445a4043f788

COPY package*.json ./

RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .

RUN npm run build
RUN ls -la dist
RUN ls -R /usr/src/app
RUN cat dist/index.js || echo "index.js no existe"

EXPOSE 3000

CMD ["npm", "start"]