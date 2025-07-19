# Bookstore Frontend (React + Vite + TypeScript)

This is the frontend for the Bookstore project, built with React, Vite, and TypeScript. It connects to the Laravel backend API for user authentication and CRUD operations on users, authors, and books.

---

## Features
- User authentication (login/logout)
- Protected dashboard
- CRUD for Authors and Books
- Responsive, modern UI with Material UI
- Navigation bar for easy access to all sections

---

## Requirements
- Node.js 18.x or 20.x (LTS recommended)
- npm (comes with Node.js)
- The backend API running (see backend README)

---

## Setup Instructions

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API URL:**
   - Create a `.env` file in the `frontend` folder:
     ```
     VITE_API_URL=http://localhost:8080/portafolio/public/api/
     ```
   - Adjust the URL if your backend runs elsewhere.

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   - The app will be available at [http://localhost:5173](http://localhost:5173)

4. **Login with demo credentials:**
   - Use the credentials provided in the backend README or by your backend seeders.

---

## Project Structure

```
frontend/
  src/
    components/      # Reusable UI components (NavigationBar, ProtectedRoute, etc.)
    context/         # React Contexts (Auth)
    hooks/           # Custom React hooks
    pages/           # Page components (LoginPage, DashboardPage, AuthorsPage, BooksPage)
    services/        # API service (Axios instance)
    types/           # TypeScript types/interfaces
    utils/           # Utility/helper functions
    App.tsx          # Main app component (routing)
    main.tsx         # Entry point
```

---

## Usage Notes
- All API requests are sent to the backend URL defined in `.env`.
- The navigation bar is hidden on the login page.
- Only authenticated users can access the dashboard, authors, and books pages.
- The token is stored in localStorage and sent with all API requests.
- Authors and books CRUD is protected by backend permissions.

---

## Demo Credentials
- See the backend README or seeders for demo user credentials (e.g., superAdmin or user accounts).

---

## License
MIT
