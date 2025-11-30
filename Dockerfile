# Используем официальный образ Bun
FROM oven/bun:1.3.3 AS base

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json bun.lock ./

# Устанавливаем зависимости
RUN bun install --frozen-lockfile

# Копируем остальные файлы проекта
COPY . .

# Стадия для разработки
FROM base AS development
EXPOSE 3000
ENV NODE_ENV=development
CMD ["bun", "run", "dev"]

# Стадия для сборки
FROM base AS build
ENV NODE_ENV=production
RUN bun run build

# Стадия для продакшена
FROM oven/bun:1.3.3 AS production
WORKDIR /app

# Копируем package.json для установки только production зависимостей
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production

# Копируем собранное приложение из стадии build
COPY --from=build /app/.output ./.output
COPY --from=build /app/public ./public

EXPOSE 3000
ENV NODE_ENV=production
CMD ["bun", "run", "preview"]

