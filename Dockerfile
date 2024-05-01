FROM node:lts-alpine3.17

RUN mkdir -p /home/node/app/node_modules

WORKDIR /home/node/app

COPY package.json dev.mjs build.js tsconfig.json vitest.config.ts ./

RUN npm install

COPY src ./src

CMD ["npm", "run", "dev"]