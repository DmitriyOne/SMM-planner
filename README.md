# SMM Planner

A social media planning tool. A post goes through draft, approval and publish, and four roles decide who can do what. The backend is NestJS with Prisma and PostgreSQL, with a Swagger API. The frontend is Next.js. Everything runs in Docker Compose.

## What it does

- **Posts** with a title, description, image and tags. A post has two flags, `isApproved` and `isPublish`, so it can be approved before it is published.
- **Comments** on every post, so the author and an admin can discuss it before it is published.
- **Roles:** `super_admin`, `admin`, `editor` and `reader`. New users start as `reader`; only a `super_admin` can change a role.
- **Auth** with a bearer token. The API is documented in Swagger.

## Run it

Start all containers:

```bash
docker-compose -f docker-compose.dev.yml up --build -d
```

Check that both containers are running:

```bash
docker ps
```

You should see `next_frontend` (Next.js) and `nest_backend` (NestJS).

| Service            | Port   |
|--------------------|--------|
| Backend (NestJS)   | `4000` |
| Frontend (Next.js) | `3000` |
| Prisma Studio      | `5555` |

## Database

Open a shell in the backend container:

```bash
docker exec -it nest_backend sh
```

Apply the migrations:

```bash
npx prisma migrate dev --name "init"
```

Fill the database with example data:

```bash
npx prisma db seed
```

The seed creates demo users with simple passwords. Use it for local development only, never on a real database.

Open Prisma Studio at [http://localhost:5555](http://localhost:5555):

```bash
npx prisma studio
```
