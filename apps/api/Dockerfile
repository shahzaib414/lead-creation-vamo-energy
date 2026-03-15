FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json tsconfig.base.json eslint.config.mjs ./
COPY apps/api/package.json ./apps/api/package.json
COPY packages/shared/package.json ./packages/shared/package.json

RUN npm ci

COPY apps/api ./apps/api
COPY packages/shared ./packages/shared

RUN npm run build -w @vamo/shared && npm run build -w @vamo/api

EXPOSE 3000

CMD ["npm", "run", "start", "-w", "@vamo/api"]
