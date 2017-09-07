FROM node:8-alpine

USER node

RUN mkdir -p /home/node/auroqueue
WORKDIR /home/node/auroqueue

COPY package.json .
RUN npm install
COPY . .

EXPOSE 8000
CMD ["node","server.js"]
