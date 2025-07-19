# Bookstore API

A Laravel 11 RESTful API for managing users, authors, and books. Built with SOLID principles, service classes, policies, and full Docker support.

---

## Features
- User registration, login, and role management (superAdmin, user)
- CRUD for Users (only superAdmin can create, update, delete)
- CRUD for Authors (any authenticated user can create; only creator or superAdmin can update/delete)
- CRUD for Books (any authenticated user can create; only creator or superAdmin can update/delete)
- Each Author is linked to the user who created them
- Each Book is linked to its Author and the user who created it
- All tables have timestamps
- API authentication with Laravel Passport
- Role/permission management with Spatie Laravel Permission
- Built for local development with Docker

---

## Requirements
- Docker & Docker Compose
- (Optional) Make sure ports 8080 (app), 8081 (phpMyAdmin), and 3306 (MySQL) are available

---

## Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <project-root>
```

### 2. Start the containers
```bash
docker-compose up -d
```

### 3. Install dependencies (inside the app container)
```bash
docker exec -it portafolio composer install
```

### 4. Copy the .env file and generate the app key
```bash
docker exec -it portafolio cp .env.example .env
docker exec -it portafolio php artisan key:generate
```

### 5. Run migrations
```bash
docker exec -it portafolio php artisan migrate
```

### 6. Seed roles (superAdmin, etc.)
```bash
docker exec -it portafolio php artisan db:seed --class=SuperAdminRoleSeeder
```

### 7. (Optional) Access phpMyAdmin
- Visit [http://localhost:8081](http://localhost:8081)
- Server: `database`, Username: `root`, Password: `root`

---

## API Overview

- **Authentication:**
  - Register/login to obtain a Passport token
  - Use `Authorization: Bearer <token>` for protected endpoints

- **Users:**
  - `GET /api/users` (public)
  - `POST /api/users` (superAdmin only)
  - `PUT /api/users/{id}` (superAdmin only)
  - `DELETE /api/users/{id}` (superAdmin only)

- **Authors:**
  - `GET /api/authors` (public)
  - `POST /api/authors` (authenticated)
  - `PUT /api/authors/{id}` (creator or superAdmin)
  - `DELETE /api/authors/{id}` (creator or superAdmin)

- **Books:**
  - `GET /api/books` (public)
  - `POST /api/books` (authenticated)
  - `PUT /api/books/{id}` (creator or superAdmin)
  - `DELETE /api/books/{id}` (creator or superAdmin)

---

## Useful Tips
- To run artisan or composer commands, always use `docker exec -it portafolio ...`
- To run migrations or seeders, use the same command pattern as above
- All API requests and responses are JSON
- All business logic is handled in service classes and policies for clean, testable code

---

## License
MIT
