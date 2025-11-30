# Feature-Sliced Design (FSD) Structure

Проект был рефакторен в соответствии с методологией Feature-Sliced Design.

## Структура проекта

```
src/
├── app/                    # Слой приложения
│   ├── plugins/            # Плагины Nuxt
│   └── providers/          # Провайдеры (для будущего использования)
│
├── pages/                  # Страницы (Nuxt pages - остаются в корне)
│
├── widgets/                # Виджеты - крупные составные UI блоки
│   ├── header/            # Хедер приложения
│   ├── aside/             # Боковая панель
│   ├── nav/               # Навигация
│   ├── last-purchases/     # Секция последних покупок
│   ├── market-filters/     # Фильтры маркета
│   └── cart-dropdown/     # Выпадающая корзина
│
├── features/               # Фичи - пользовательские взаимодействия
│   ├── add-to-cart/       # Добавление в корзину
│   ├── auth/             # Аутентификация
│   ├── product-filter/    # Фильтрация продуктов
│   ├── product-search/    # Поиск продуктов
│   ├── product-sort/      # Сортировка продуктов
│   └── purchase-history/  # История покупок
│
├── entities/              # Сущности - бизнес-сущности
│   ├── product/          # Продукт
│   │   ├── ui/           # UI компоненты продукта
│   │   ├── model/        # Store и бизнес-логика
│   │   └── api/          # API запросы
│   ├── user/             # Пользователь
│   │   ├── ui/           # UI компоненты пользователя
│   │   ├── model/        # Store и бизнес-логика
│   │   └── api/          # API запросы
│   └── cart/             # Корзина
│       ├── ui/           # UI компоненты корзины
│       └── model/        # Store и бизнес-логика
│
└── shared/                # Общий код
    ├── ui/               # Базовые UI компоненты
    ├── lib/              # Утилиты и хелперы
    ├── api/               # API клиент
    ├── config/            # Конфигурация (i18n, constants)
    ├── types/             # TypeScript типы
    └── assets/            # Статические ресурсы
```

## Основные изменения

### 1. Entities (Сущности)
- **product**: Компоненты карточек продуктов, store для управления продуктами, API для загрузки
- **user**: Store для пользователя и аутентификации, API для логина
- **cart**: Логика корзины (частично в user store, можно вынести отдельно)

### 2. Widgets (Виджеты)
- Крупные составные компоненты, использующие entities и features
- TheHeader, TheAside, TheNav, LastPurchasesSection, MarketTypeFilters

### 3. Shared (Общий код)
- **ui/**: Базовые UI компоненты (Button, Input, Badge, Icon, etc.)
- **lib/**: Утилиты (useDebounce, useModal, useT)
- **api/**: API клиент ($api)
- **config/**: Конфигурация (i18n, constants)
- **types/**: TypeScript типы
- **assets/**: Статические ресурсы (изображения, стили, SVG)

### 4. Features (Фичи)
- Директории созданы для будущих фич
- Можно вынести логику из pages в соответствующие features

## Конфигурация

### nuxt.config.ts
- Обновлены пути для CSS, компонентов, импортов
- Настроен auto-import для stores, composables, types
- Обновлены пути для i18n и Pinia

### Импорты
Все импорты обновлены для использования новой структуры:
- `~/shared/types/*` вместо `~/types/*`
- `~/shared/assets/*` вместо `~/assets/*`
- `~/shared/lib/*` вместо `~/composables/*`

## Следующие шаги

1. Вынести логику из pages в features
2. Создать отдельный cart entity/store
3. Добавить больше features для изоляции бизнес-логики
4. Оптимизировать структуру widgets

