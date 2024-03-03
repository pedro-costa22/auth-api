FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN rm -rf node_modules/
RUN npm update

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]