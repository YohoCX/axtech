FROM node:20-alpine AS base

WORKDIR /usr/src/node-api

ENV DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres?schema/=public
ENV PORT=3000
ENV CONSUMER_JWT_SECRET=jwtsecret
ENV SALT_ROUNDS=10

COPY package*.json ./
COPY yarn.lock ./
COPY tsconfig*.json ./
COPY prisma ./prisma/

RUN yarn install
COPY . .

RUN yarn prisma generate
RUN yarn build

EXPOSE 3000
CMD ["yarn", "run", "start:dev"]