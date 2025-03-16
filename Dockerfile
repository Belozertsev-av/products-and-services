# Используем Node.js образ с Corepack для Yarn
FROM node:18 AS builder

# Активируем Corepack и устанавливаем Yarn 4.7.0
RUN corepack enable
RUN yarn set version 4.7.0

WORKDIR /app

# Копируем файлы конфигурации Yarn
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn ./.yarn
COPY prisma ./prisma/

# Устанавливаем зависимости с Yarn
RUN yarn install --immutable

# Копируем исходный код и собираем проект
COPY . .
RUN yarn build

# Применяем миграции и запускаем приложение
CMD yarn prisma migrate deploy && \
    yarn prisma generate && \
    node ./prisma/seed.js && \
    yarn start