# This is a very simple Dockerfile for running the frontend service, can be improved by using multi-stage builds later on.
FROM node:22

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# RUN npm run build
# we could copy build artifacts to another image and use remix-serve

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]