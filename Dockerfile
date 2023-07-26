FROM node:alpine
WORKDIR /app
COPY package*.json ./
COPY prisma ./prisma/ 
COPY .env ./
COPY tsconfig.json ./
COPY . .
RUN npm install
RUN npm i yarn
RUN yarn prisma generate
EXPOSE 3000
CMD ["yarn", "run", "start:dev"]