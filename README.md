# Проект: SMM Planner

## Запуск контейнеров

Для запуска всех Docker-контейнеров используйте команду:

```bash
docker compose up --build -d
```

## Проверка запущенных контейнеров

Убедитесь, что все контейнеры работают:

```bash
docker ps
```

Вы должны увидеть 3 запущенных контейнера:
- `next_frontend` (Next.js)
- `nest_backend` (NestJS)
- `postgres_db` (PostgreSQL)

## Порты сервисов

| Сервис                  | Порт  |
|-------------------------|-------|
| Database (PostgreSQL)   | `5432` |
| Backend (NestJS)        | `5001` |
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


## Работа с базой данных PostgreSQL

### Получение списка всех таблиц

Для получения списка всех таблиц в схеме `public`, выполните следующий запрос:

```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
```

### Выбор данных из таблицы

Чтобы выбрать все данные из таблицы, например, `Post`, выполните следующий запрос:

```sql
SELECT * FROM "Post";
```

### Подключение к базе данных через контейнер PostgreSQL

1. Заходите в контейнер PostgreSQL:

   ```bash
   docker exec -it postgres_db sh
   ```

2. Подключитесь к базе данных как пользователь `admin`:

   ```bash
   psql -U admin -d planner
   ```

3. Для просмотра всех пользователей выполните:

   ```sql
   SELECT * FROM pg_user;
   ```

4. Для вывода всех баз данных выполните:

   ```bash
   \l
   ```

5. Для переключения на нужную базу данных выполните:

   ```bash
   \c your_database_name;
   ```

6. Для отображения всех таблиц выполните:

   ```bash
   \dt;
   ```

7. Для просмотра структуры таблицы выполните:

   ```bash
   \d table_name;
   ```