# 📝 Keep Notes — MERN Stack Todo Application

A full-stack Todo / Notes application built using the MERN stack.

Keep Notes allows users to register and login securely using JWT authentication and manage their personal notes. Each user's notes are stored separately in MongoDB and can only be accessed by the authenticated user.

## 🚀 Live Demo

Frontend:
https://mansi-srivastava11.github.io/ToDo_website/

Backend API:
https://todo-website-ro36.onrender.com/

---

## ✨ Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Password hashing using bcryptjs
- Protected Todo APIs
- User-specific Todo data
- Logout functionality

### 📝 Todo / Notes Management
- Create a new note
- View all personal notes
- Update notes
- Delete notes
- Mark notes as completed
- Search notes
- Sort notes
- Pagination support
- Priority selection
- Due date support

### 👤 User Features
- Personalized welcome message
- User profile name
- User-specific notes
- Persistent authentication using JWT
- Secure API requests using Bearer Token

### 🎨 UI
- Clean and modern interface
- Responsive design
- Mobile-friendly layout
- Dashboard
- Sidebar navigation
- Task details section
- Toast notifications
- Loading states

---

## 🛠️ Tech Stack

### Frontend

- React.js
- Vite
- JavaScript
- CSS
- Fetch API
- LocalStorage

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

### Deployment

- GitHub Pages — Frontend
- Render — Backend
- MongoDB Atlas — Database

---

## 📂 Project Structure

```text
TODO-Website/
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── AddTask/
│   │   │   │   ├── AddTask.jsx
│   │   │   │   └── AddTask.css
│   │   │   │
│   │   │   ├── Dashboard/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   └── Dashboard.css
│   │   │   │
│   │   │   ├── Header/
│   │   │   ├── Sidebar/
│   │   │   ├── TaskCard/
│   │   │   ├── TaskList/
│   │   │   └── TaskDetails/
│   │   │
│   │   ├── services/
│   │   │   ├── todoService.js
│   │   │   └── authService.js
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   ├── .env
│   ├── vite.config.js
│   └── package.json
│
└── backend/
    │
    ├── controllers/
    │   ├── authController.js
    │   └── todo.controller.js
    │
    ├── models/
    │   ├── User.js
    │   └── todo.model.js
    │
    ├── routes/
    │   ├── authRoutes.js
    │   └── todo.routes.js
    │
    ├── middleware/
    │   ├── authMiddleware.js
    │   ├── asyncHandler.js
    │   └── error.middleware.js
    │
    ├── config/
    │   └── db.js
    │
    ├── server.js
    ├── .env
    └── package.json

## 🔐 Authentication Flow

**Registration**

User
 ↓
Register Form
 ↓
POST /api/auth/register
 ↓
Validate User
 ↓
Hash Password
 ↓
Save User in MongoDB
 ↓
Generate JWT
 ↓
Return Token
 ↓
Save Token in LocalStorage

**Login**

User
 ↓
Login Form
 ↓
POST /api/auth/login
 ↓
Verify Email & Password
 ↓
Generate JWT
 ↓
Return Token
 ↓
Save Token in LocalStorage

### 📌 API Endpoints

## Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

## Todos

| Method | Endpoint                | Description                |
| ------ | ----------------------- | -------------------------- |
| GET    | `/api/todos`            | Get logged-in user's Todos |
| GET    | `/api/todos/:id`        | Get a Todo by ID           |
| POST   | `/api/todos`            | Create a Todo              |
| PUT    | `/api/todos/:id`        | Update a Todo              |
| PATCH  | `/api/todos/:id/toggle` | Toggle completion          |
| DELETE | `/api/todos/:id`        | Delete a Todo              |

### 💻 Installation & Setup

1. Clone the repository
        git clone https://github.com/Mansi-Srivastava11/ToDo_website.git
        cd ToDo_website
2. Install backend dependencies
        cd backend
        npm install
3. Configure backend environment variables
    Create backend/.env:

        PORT=3001
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
4. Start backend
        npm run dev

The backend will run locally on:    http://localhost:3001
        
5. Install frontend dependencies

Open another terminal:
        cd frontend
        npm install
6. Configure frontend
    Create:
        frontend/.env

    Add:
        VITE_API_URL=http://localhost:3001

7. Start frontend
        npm run dev


### 🔒 Security

        - Passwords are hashed before being stored.
        - JWT is used for authentication.
        - Todo routes are protected with authentication middleware.
        - Each Todo stores the corresponding userId.
        - Users can access only their own Todo data.
        - Environment secrets are kept outside the source code.

### Clone the Repository

    git clone https://github.com/Mansi-Srivastava11/ToDo_website.git
    cd ToDo_website

## 🧠 Key Concepts Demonstrated

This project demonstrates practical knowledge of:

React component architecture
React Hooks
State management
Controlled forms
REST API integration
CRUD operations
Express.js routing
Express middleware
JWT authentication
Password hashing
MongoDB CRUD
Mongoose schemas and models
MongoDB relationships using ObjectId
Error handling
Async/await
Fetch API
Local Storage
Environment variables
CORS
Git/GitHub
GitHub Actions
GitHub Pages deployment
Render deployment
Responsive UI development

## 👩‍💻 Author

**Mansi Srivastava**

MERN Stack Developer

GitHub: https://github.com/Mansi-Srivastava11

---

⭐ If you like this project, consider giving it a star on GitHub.