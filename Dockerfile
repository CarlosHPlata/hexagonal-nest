FROM node:14.15.5-alpine

COPY package-lock.json /hexagonal-nest-ms/
COPY package.json /hexagonal-nest-ms/

WORKDIR /hexagonal-nest-ms

RUN npm install

ADD . /hexagonal-nest-ms

EXPOSE 3000

CMD ["npm", "run", "start:dev"]
