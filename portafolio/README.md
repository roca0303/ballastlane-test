# Bookstore Fullstack App (Laravel 11 + React + Docker)

A fullstack web application with a Laravel 11 backend (RESTful API) and a React + Vite frontend, all ready to run with Docker.

---

## Features
- User registration, login, and management (roles: superAdmin, user)
- CRUD for users, authors, and books
- Relationships between users, authors, and books
- API protected with Passport and roles/permissions (Spatie)
- Modern, responsive, and user-friendly frontend
- Database and phpMyAdmin included in Docker
- Seeders and demo data for testing

---

## Requirements
- Docker & Docker Compose
- (Optional) Free ports: 8080 (backend), 8081 (phpMyAdmin), 3306 (MySQL), 5173 (frontend)

---

## Quick Start

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Start all services (backend, frontend, db, phpmyadmin)
```bash
docker-compose up -d --build
```

This will start:
- **Backend (Laravel):** http://localhost:8080
- **Frontend (React):** http://localhost:5173
- **phpMyAdmin:** http://localhost:8081 (Server: `database`, User: `root`, Pass: `root`)

### 3. Initialize the backend (only the first time)

Install dependencies, copy .env, generate the key, migrate and seed:
```bash
docker exec -it portafolio composer install
# Run migrations and seeders
docker exec -it portafolio php artisan migrate --seed
```

---

## Demo Credentials
- **Demo users:** Automatically created by the seeders.
- **superAdmin:**
  - Email: `superadmin@hotmail.com` (or check the seeders for the generated email)
  - Password: `saPortafolio123`
- You can check users in the database or via the API.

---

## Main API Endpoints
- `/api/users` (CRUD users, superAdmin only)
- `/api/authors` (CRUD authors, authenticated)
- `/api/books` (CRUD books, authenticated)

---

## Frontend
- Access [http://localhost:5173](http://localhost:5173)
- The frontend automatically consumes the backend API
- You can login, and perform CRUD for authors and books, etc.

---

## Useful Tips
- To run artisan/composer commands:
  ```bash
  docker exec -it portafolio php artisan <command>
  docker exec -it portafolio composer <command>
  ```
- To view frontend logs:
  ```bash
  docker-compose logs frontend
  ```
- To stop all services:
  ```bash
  docker-compose down
  ```

---

## License
MIT
