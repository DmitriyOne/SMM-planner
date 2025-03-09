# Проект: SMM Planner

## Запуск контейнеров

Для запуска всех Docker-контейнеров используйте команду:

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

## Проверка запущенных контейнеров

Убедитесь, что все контейнеры работают:

```bash
docker ps
```

Вы должны увидеть 2 запущенных контейнера:
- `next_frontend` (Next.js)
- `nest_backend` (NestJS)

## Порты сервисов

| Сервис                  | Порт  |
|-------------------------|-------|
| Backend (NestJS)        | `4000` |
| Frontend (Next.js)      | `3000` |

## Запуск миграций Prisma

Чтобы применить миграции базы данных, выполните эти команды:

1. Зайдите в контейнер с бэкендом:

   ```bash
   docker exec -it nest_backend sh
   ```

2. Примените миграции:

   ```bash
   npx prisma migrate dev --name "init"
   ```

## Заполнение базы данных примерами

Чтобы заполнить базу данных тестовыми данными, выполните эти шаги:

1. Зайдите в контейнер с бэкендом:

   ```bash
   docker exec -it nest_backend sh
   ```

2. Запустите скрипт заполнения базы данных:

   ```bash
   npx prisma db seed
   ```
   
## Подключение к Prisma Studio

Чтобы подключиться к Prisma Studio, выполните следующую команду:

```bash
npx prisma studio
```

Это откроет Prisma Studio в браузере по адресу [http://localhost:5555](http://localhost:5555).
