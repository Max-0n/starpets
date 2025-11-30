# Starpets

Nuxt 3 приложение для управления питомцами.

## Архитектура проекта

Проект использует методологию **Feature-Sliced Design (FSD)** для организации кода.

📖 Подробнее о структуре проекта: [FSD_STRUCTURE.md](./FSD_STRUCTURE.md)

## Требования

- [Bun](https://bun.sh/) 1.3.3
- Node.js >= 18 (если не используется Bun)

## Быстрый старт

### Локальная разработка

1. Установите зависимости:

```bash
bun install
```

2. Запустите dev-сервер:

```bash
bun run dev
```

Приложение будет доступно по адресу `http://localhost:3000`

### Разработка с Docker

Для удобной разработки и тестирования можно использовать Docker:

1. Запустите контейнер:

```bash
docker-compose up
```

2. Для запуска в фоновом режиме:

```bash
docker-compose up -d
```

3. Остановите контейнер:

```bash
docker-compose down
```

4. Пересоберите образ (после изменений в Dockerfile):

```bash
docker-compose up --build
```

Приложение будет доступно по адресу `http://localhost:3000`

> **Примечание:** При использовании Docker, изменения в коде будут автоматически применяться благодаря volume-монтированию.

## Доступные команды

- `bun run dev` - запуск dev-сервера
- `bun run build` - сборка приложения
- `bun run generate` - генерация статического сайта
- `bun run preview` - предпросмотр production-сборки
- `bun run type-check` - проверка типов TypeScript
- `bun run lint` - проверка кода линтером
- `bun run lint-fix` - автоматическое исправление ошибок линтера

## Production

### Локальная сборка

```bash
bun run generate
```

### Предпросмотр production-сборки

```bash
bun run preview
```

### Docker для production

Для сборки и запуска production-версии в Docker:

1. Соберите production-образ:

```bash
docker build --target production -t starpets:production .
```

2. Запустите контейнер:

```bash
docker run -p 3000:3000 --env-file .env starpets:production
```

Подробнее о деплое: [Nuxt deployment documentation](https://nuxt.com/docs/getting-started/deployment)

## CDN

**Place assets in `cdn/static` located in the root of the repository.**

Then, run command in the /cdn directory

```bash
# bun
bun gen
```

### Local development

Create symlink to cdn static in frontend folder

```bash
# macos
ln -s ../../cdn/static public/static

# windows
# use cmd in /frontend
mklink /D public\static ..\..\cdn\static
# or
# Power shell:
Start-Process -FilePath "$env:comspec" -ArgumentList "/k", "mklink", "/D", "`"public\static`"","`"..\..\cdn\static`""
```

### Usage

Use composable `$cdn.url()` anywhere you need

```vue
<template lang="pug">
  UIImage(
    :compressed="$cdn.url('avatar/01.webp')"
    :image="$cdn.url('avatar/01.jpg')"
  )
</template>
```

## Localization
[Google doc - UI_content_for_localization](https://docs.google.com/spreadsheets/d/12NbcM5ZB4kmlrSYDdKzJM0RdFT1Q5G8oexWkQscsJes/edit?gid=329043228#gid=329043228)

To generate localization files, you need to run the script `bun run get-l18n` (from the repository root)
