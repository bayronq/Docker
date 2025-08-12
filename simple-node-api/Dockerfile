ARG NODE_IMAGE="docker.io/node:18" # Misma versión utilizada en las pruebas anteriores
FROM ${NODE_IMAGE}

WORKDIR /app
COPY package*.json ./
RUN npm install && \
  npm run test
COPY . .

ENV PORT=3000
EXPOSE 3000
CMD ["npm", "start"]
