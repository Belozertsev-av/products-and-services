# Stage 1 - Build
FROM node:18-slim AS builder

RUN corepack enable && yarn set version 4.7.0

WORKDIR /app

# Копируем только необходимые файлы для установки зависимостей
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY prisma ./prisma/

# Устанавливаем зависимости и генерируем Prisma клиент
RUN yarn install --immutable
RUN yarn prisma generate

# Копируем остальные файлы и собираем проект
COPY . .
RUN yarn build

# Stage 2 - Production
FROM node:18-slim AS production

RUN corepack enable && yarn set version 4.7.0

RUN apt-get update && apt-get install -y openssl

WORKDIR /app

# Копируем только необходимые файлы
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/.yarnrc.yml ./
COPY --from=builder /app/.yarn ./.yarn
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/prisma ./prisma

# Применяем миграции и запускаем
CMD yarn prisma:migrate && \
    yarn seed && \
    yarn start