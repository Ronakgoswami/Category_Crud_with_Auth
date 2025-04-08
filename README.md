# Category Management API

This project is a Node.js + Express backend using TypeScript with JWT authentication and category management.

## Features

- User registration and login
- JWT protected category routes
- category CRUD
- Dockerized setup
- Jest + Supertest unit/integration testing

## Setup

```bash
git clone <repo-url>
npm install
cp .env.example .env
npm run dev
```

## Docker

```bash
docker-compose up --build
```

## Run Tests

```bash
npm run test
```

## API Routes

- POST /api/auth/register
- POST /api/auth/login
- POST /api/category
- GET /api/category
- PUT /api/category/:id
- DELETE /api/category/:id
