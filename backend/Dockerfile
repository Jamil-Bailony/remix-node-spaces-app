# This is a very simple Dockerfile for running the backend service, can be improved by using multi-stage builds later on.
FROM node:22

WORKDIR /app

ENV NODE_ENV=$NODE_ENV

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev", "--", "--host"]