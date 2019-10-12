FROM node:slim

ENV NODE_ENV=production
COPY . /www
WORKDIR /www
RUN npm i
RUN npm run build

CMD npm run start
