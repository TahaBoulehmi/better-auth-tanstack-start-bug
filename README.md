# Server Functions (Debug Repo)

This repo is for **debugging purposes** — a minimal reproduction to share a bug with the [Better Auth](https://www.better-auth.com/) team.

## How to run

### 1. Install dependencies

```bash
npm install
```

### 2. Database (Prisma + PostgreSQL)

- Create a PostgreSQL database and set its URL in a `.env` file at the project root:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/your_db"
```

- Generate the Prisma client and run migrations:

```bash
npm run prisma:generate
npm run prisma:migrate
```

The schema includes Better Auth models (User, Session, Account, Verification, Organization, Member, Invitation). The first migration applies the Better Auth schema.

### 3. Start the dev server

```bash
npm run dev
```

The app runs at **http://localhost:3000**.

---

**Stack:** TanStack Start, Better Auth (with organization plugin), Prisma, PostgreSQL.
