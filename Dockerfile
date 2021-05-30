FROM node:14-alpine 
LABEL maintainer="Bruno Germano"

ARG NODE_ENV

WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json .env ./
RUN npm ci

COPY src ./src
COPY config ./config

CMD [ "npm", "start" ]