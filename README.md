# Проект: SMM Planner

## Запуск контейнеров
Для запуска всех Docker-контейнеров с пересборкой используйте команду:

```sh
docker compose up --build -d
```

## Проверка запущенных контейнеров
Убедитесь, что все контейнеры работают:

```sh
docker ps
```

Вы должны увидеть 3 запущенных контейнера:
- `next_frontend` (Next.js)
- `nest_backend` (NestJS)
- `postgres_database` (PostgreSQL)

## Порты сервисов
| Сервис    | Порт  |
|-----------|-------|
| Database (PostgreSQL) | `5432` |
| Backend (NestJS) | `5001` |
| Frontend (Next.js) | `3000` |

## Запуск миграций Prisma
Чтобы применить миграции базы данных, выполните эти команды:

```sh
docker exec -it nest_backend sh
```

```sh
npx prisma migrate dev --name "init"
```

## Заполнить Prisma
Чтобы заполнить базу данных первыми данными запусти:

```sh
docker exec -it nest_backend sh
```

```sh
npx prisma db seed
```


## Работа с базой данных PostgreSQL

### Получение списка всех таблиц в схеме public

Этот запрос вернет список всех таблиц в схеме `public`. Если ваши таблицы находятся в другой схеме, замените `'public'` на нужную схему:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

### Выбор данных из таблицы

Чтобы выбрать все данные из таблицы, например, `Post`, используйте следующий запрос:

```sql
SELECT * FROM "Post";
```
