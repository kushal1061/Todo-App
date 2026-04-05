# Todo App

A fullstack task management application with user authentication and a warm, paper-inspired UI.

---

## Tech Stack

| Layer      | Technology                                                     |
|------------|----------------------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, React Router, Axios, Lucide React |
| Backend    | Node.js, Express.js                                            |
| Database   | MongoDB (Mongoose ODM)                                         |
| Auth       | JWT (JSON Web Tokens), bcryptjs                                |
| Testing    | Jest, Supertest, mongodb-memory-server                         |

---

## Features

- **User Authentication** — Register and login with JWT-based session management.
- **Task CRUD** — Create, read, update, and delete tasks.
- **Task Completion** — Mark tasks as complete (one-way, cannot be undone via the endpoint).
- **Due Dates & Categories** — Assign due dates and categories (work, personal, shopping, other) to tasks.
- **Per-User Data** — Tasks are scoped to the authenticated user only.
- **Validation** — Task titles cannot be empty; email format is validated; passwords are hashed.
- **Responsive UI** — Warm paper/analog design built with Tailwind CSS, Syne + DM Mono typography.

---

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── authController.js    # Register & login logic
│   │   │   └── taskController.js    # CRUD + completion logic
│   │   ├── middleware/
│   │   │   └── auth.js              # JWT verification middleware
│   │   ├── models/
│   │   │   ├── User.js              # User schema (bcrypt hashing)
│   │   │   └── Task.js              # Task schema
│   │   ├── routes/
│   │   │   ├── authRoutes.js        # POST /register, /login
│   │   │   └── taskRoutes.js        # CRUD endpoints (protected)
│   │   ├── app.js                   # Express app config
│   │   └── server.js                # MongoDB connection & server start
│   ├── tests/
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── TaskCard.jsx
    │   │   └── TaskForm.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx       # Auth state management
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   └── TaskManager.jsx
    │   ├── services/
    │   │   ├── api.js                # Axios instance + interceptors
    │   │   ├── auth.service.js       # Auth API calls
    │   │   └── task.service.js       # Task API calls
    │   ├── index.css                 # Tailwind directives & base styles
    │   ├── App.jsx                   # Routing & protected routes
    │   └── main.jsx                  # Entry point
    ├── tailwind.config.js
    ├── postcss.config.js
    └── package.json
```

---

## Prerequisites

- **Node.js** (v18+)
- **MongoDB** — Local instance or a MongoDB Atlas connection string

---

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd chaintach
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`.

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## API Endpoints

### Auth

| Method | Endpoint             | Body                                    | Description       |
|--------|----------------------|-----------------------------------------|-------------------|
| POST   | `/api/auth/register` | `{ username, email, password }`         | Register new user |
| POST   | `/api/auth/login`    | `{ email, password }`                   | Login             |

Both return `{ _id, username, email, token }`.

### Tasks (Protected — requires `Authorization: Bearer <token>`)

| Method | Endpoint                    | Body                                           | Description           |
|--------|-----------------------------|-------------------------------------------------|-----------------------|
| GET    | `/api/tasks`                | —                                               | Get all user tasks    |
| POST   | `/api/tasks`                | `{ title, description?, dueDate?, category? }` | Create a task         |
| PUT    | `/api/tasks/:id`            | `{ title?, description?, dueDate?, category?, completed? }` | Edit a task |
| PATCH  | `/api/tasks/:id/complete`   | —                                               | Mark task as complete |
| DELETE | `/api/tasks/:id`            | —                                               | Delete a task         |

---

## Testing

Run the backend test suite:

```bash
cd backend
npm test
```

Tests use `mongodb-memory-server` so no external database is required.

---

## Environment Variables

| Variable       | Description                           | Default                                       |
|----------------|---------------------------------------|-----------------------------------------------|
| `PORT`         | Server port                           | `3000`                                        |
| `MONGODB_URI`  | MongoDB connection string             | `mongodb://localhost:27017/task-management`    |
| `JWT_SECRET`   | Secret key for signing JWT tokens     | `fallback_secret`                             |
