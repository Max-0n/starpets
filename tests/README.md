# Запуск тестов

## Установка зависимостей

Сначала установите все зависимости:

```bash
bun install
```

## Запуск тестов

### Все тесты
```bash
bun run test
```

### В watch режиме
```bash
bun run test --watch
```

### С UI интерфейсом
```bash
bun run test:ui
```

### С покрытием кода
```bash
bun run test:coverage
```

## Структура тестов

Все тесты находятся в директории `tests/` и повторяют структуру исходного кода:
- `tests/shared/api/useApi.test.ts` - тесты для API клиента
- `tests/entities/product/api/index.test.ts` - тесты для productApi
- `tests/entities/product/api/useProducts.test.ts` - тесты для useProducts composable

## Настройка

Конфигурация Vitest находится в `vitest.config.ts`.
Setup файл с моками находится в `tests/setup.ts`.

