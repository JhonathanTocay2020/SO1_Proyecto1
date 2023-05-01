# construir dockerfile Cliente gRPC
# syntax=docker/dockerfile:1

#Version node
FROM node:lts-alpine3.17

#directorio de trabajo
WORKDIR /app

#Copiando archivos con las librerias necesarias
COPY package.json ./
COPY package-lock.json ./
COPY . .

#listar y ejecutar todos los archivos
RUN ls -a
RUN npm install

CMD ["node", "api_server.js"]