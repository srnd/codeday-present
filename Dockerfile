FROM node:13-alpine

ENV NODE_ENV=production
RUN mkdir /www
COPY package.* /www
WORKDIR /www

RUN npm i

COPY . /www
RUN npm run build
CMD npm run start
