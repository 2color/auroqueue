FROM node

USER node

RUN mkdir -p /home/node/auroqueue
WORKDIR /home/node/auroqueue

# Leaverage docker caching for dependencies which change less often than
# source code
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .

EXPOSE 8000
CMD ["node","server.js"]
